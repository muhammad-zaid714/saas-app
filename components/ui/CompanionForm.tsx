"use client"
import {z}  from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/constants'
import { createCompanion } from '@/lib/actions/companion.actions'
import { redirect } from 'next/navigation'
const companionFormSchema = z.object({
  name: z.string().min(1, 'Companion is required'),
  subject: z.string().min(1, 'Subject is required'),
  topic: z.string().min(1, 'Topic is required'),
  voice: z.string().min(1, 'Voice is required'),
  style: z.string().min(1, 'Style is required'),
  duration: z.coerce.number().min(1, 'Duration is required'),
})
const CompanionForm = () => {
  const form  = useForm({
    resolver: zodResolver(companionFormSchema),
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      style: '',
      duration: 15,
      voice: '',
    },
  })
  const onSubmit = async (data:z.infer<typeof companionFormSchema>) => {
    const companion=await createCompanion(data)
    if(companion){
      redirect(`/companions/${companion.id}`)
  }else{
    console.log("Failed to create companion")
    redirect('/')
  }}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" {...field}
                className='input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject)=>(
                        <SelectItem 
                          key={subject} value={subject} className='capitalize'>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="E.g. Homework, Revision" {...field}
                className='input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                    <SelectTrigger className="input ">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                     <SelectItem value='male'>
                      Male
                     </SelectItem>
                     <SelectItem value='female'>
                      Female
                     </SelectItem>
                    </SelectContent>
                  </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                    <SelectTrigger className="input ">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                     <SelectItem value='formal'>
                      Formal
                     </SelectItem>
                     <SelectItem value='casual'>
                      Casual
                     </SelectItem>
                    </SelectContent>
                  </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter the duration in minutes</FormLabel>
              <FormControl>
                <Input type='number' placeholder="15" {...field}
                value={field.value as number}
                className='input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"className='w-full cursor-pointer'>Build your companion</Button>
      </form>
    </Form>
  )
  
}

export default CompanionForm