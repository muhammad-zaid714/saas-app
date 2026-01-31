"use client"
import { vapi } from "@/lib/actions/vapi.sdk";
import { cn,  configureAssistant,  getSubjectColor } from "@/lib/utils"
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}
const CompanionComponent = ({subject,companionId,userName,userImage,style,voice,topic,name}:CompanionComponentProps) => {
    const [calls,setCalls]=useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking,setIsSpeaking]=useState<boolean>(false);

    const [isMuted,setIsMuted]=useState<boolean>(false);

    const lottieref = useRef<LottieRefCurrentProps>(null)
    const [messages,setMessages] = useState<SavedMessage[]>([])

    useEffect(()=>{
        if(isSpeaking){
            lottieref.current?.play();
        }else{
            lottieref.current?.stop();
        }
    },[isSpeaking,lottieref])

    useEffect(()=>{

        const onCallStart  = ()=> setCalls(CallStatus.ACTIVE)

        const onCallEnd = ()=> {
            setCalls(CallStatus.FINISHED)
            addToSessionHistory(companionId)
        }
        const onMessage =(message:Message)=> {
            if(message.type==='transcript'&& message.transcriptType==='final'){
                const newMessage={role:message.role,content:message.transcript}
                setMessages((prev)=>[newMessage,...prev ])
            }
        }

        const onError = (error:Error) =>{
            console.error('Companion Error:',error)
            setCalls(CallStatus.FINISHED)
        }

        const onSpeechStart = () => setIsSpeaking(true);

        const onSpeechEnd = () => setIsSpeaking(false);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    },[])
    const toggleMicrophone = () =>{
        const currentMuted = vapi.isMuted()
        const newMutedState = !currentMuted
        vapi.setMuted(newMutedState)
        setIsMuted(newMutedState)
    }

    const handleCall = async () =>{
        setCalls(CallStatus.CONNECTING);
        const assistantOverrides = {
            variableValues:{
                subject,
                topic,
                style,
                
            },
            clientMessages:['transcript'],
            serverMessages:[]
        }
        vapi.start(configureAssistant(voice,style),assistantOverrides);
    }

    const handleDisconnect = () =>{
        setCalls(CallStatus.FINISHED);
        vapi.stop();
    }

  return (
    <section className="flex flex-col h-[70vh]">
        <section className="flex gap-8 max-sm:flex-col">
            <div className="companion-section">
                <div className="companion-avatar" style={{backgroundColor:getSubjectColor(subject)}}>
                    <div className={cn('absolute transition-opacity duration-1000',
                        calls===CallStatus.FINISHED|| calls===CallStatus.INACTIVE ? 'opacity-1001':'opacity-0',calls===CallStatus.CONNECTING &&'opacity-100 animate-pulse'
                    )}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit"/>
                    </div>
                    <div className={cn('absolute transition-opacity duration-1000',calls===CallStatus.ACTIVE?'opacity-100':'opacity-0')}>
                        <Lottie 
                        lottieRef={lottieref}
                        animationData={soundwaves }
                        autoplay={false}
                        className="companion-lottie"
                        />
                    </div>
                </div>
                <p className="font-bold text-2xl">{name}</p>
            </div>
            <div className="user-section">
                <div className="user-avatar">
                    <Image src={userImage} alt={userName} width={130} height={130} className="rounded-lg"/>
                <p className="font-bold text-2xl">{userName}</p>
                </div>
            
            <div className="flex flex-col gap-3">
                <button className="btn-mic" onClick={toggleMicrophone} disabled={calls!==CallStatus.ACTIVE}>
                  <Image src={isMuted?'/icons/mic-off.svg':'/icons/mic-on.svg'} alt='mic' width={36} height={36}/>
                  <p className="max-sm:hidden">
                    {isMuted?'Turn on microphone':'Turn off microphone'}
                  </p>
                </button>
                </div>
                <button 
                    className={cn('rounded-lg py-4 px-6 cursor-pointer transition w-full text-white font-semibold text-center',
                        calls===CallStatus.ACTIVE?"bg-red-600 hover:bg-red-700":"bg-primary hover:bg-primary/90",
                        calls===CallStatus.CONNECTING && 'animate-pulse cursor-not-allowed'
                    )}
                    onClick={calls===CallStatus.ACTIVE ? handleDisconnect : handleCall}
                   
                >
                  {calls===CallStatus.ACTIVE?"End Session":calls===CallStatus.CONNECTING?"Connecting...":"Start Session"}
                </button>
            
            </div>
        </section>
        <section className="transcript">
            <div className="transcript-message no-scrollbar">
                {messages.map((message,index)=>{
                    if(message.role==='assistant'){
                        return (
                            <p key={index} className="text-gray-800 dark:text-gray-200 font-medium max-sm:text-sm">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{name.split('')[0].replace(/[.,]/g, '')}:</span> {message.content}
                            </p>
                        )
                    }else{
                        return (
                            <p key={index} className="text-gray-800 dark:text-gray-200 font-medium max-sm:text-sm">
                                <span className="font-semibold text-green-600 dark:text-green-400">{userName}:</span> {message.content}
                            </p>
                        )
                    }
                })}
            </div>
            <div className="transcript-fade"/>
        </section>
    </section>
  )
}

export default CompanionComponent;

