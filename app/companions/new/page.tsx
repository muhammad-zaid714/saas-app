import CompanionForm from '@/components/ui/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation'
const CompanionsForm = async () => {
  const {userId}=await auth();
if(!userId) redirect('/sign-in')
  const canCreateCompanion = await newCompanionPermissions()
  return (
    <main className='lg:w-1/3 md:w-2/3 items-center justify-center'>
      {canCreateCompanion?(
      <article className='w-full gap-4 flex flex-col'>
      <h1>Companion Builder</h1>
      <CompanionForm />
      </article>
      ):(
        
          <article className='companion-limit'>

            <Image src='/images/limit.svg' alt='Companion limit reached' width={360} height={260}/>
          <div className='cta-badge'>
            Upgrade your plan .
          </div>
          <h1>You've reached your companion limit.</h1>
          <p>Please upgrade your plan to create more companions.</p>
          <Link href='/subscription' className='btn-primary mt-4 w-fit justify-center'><span>Upgrade my plan</span></Link>
          </article>
        
      )}
    </main>
  )
}

export default CompanionsForm