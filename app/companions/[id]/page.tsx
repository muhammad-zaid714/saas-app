import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { redirect } from "next/navigation";
interface CompanionSessionPageProps{
    params:Promise<{  id:string }>
}
const CompanionsSession =async ({params}:CompanionSessionPageProps) => {
  const {id}=await params;
  const companion= await getCompanion(id);
  const user = await currentUser();
  
  if(!user) redirect('/sign-in');
  if(!companion) redirect('/companions');
  
  const {name,subject,topic,duration, title}=companion;
  return (
    <main className="p-6"> 
      <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0" 
            style={{backgroundColor:getSubjectColor(subject)}}>
              <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24}/> 
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-lg text-gray-900">{name}</p>
              <p className="text-gray-600 text-sm">{topic}</p>
            </div>
          </div>
          <div className="text-gray-500 text-sm font-medium">
            {duration} minutes
          </div>
        </div>
      </article>
      <CompanionComponent 
      {...companion}
      companionId={id}
      userName={user.firstName!}
      userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionsSession;