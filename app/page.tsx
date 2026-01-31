import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { Button } from "@/components/ui/button"
import { recentSessions } from "@/constants"
import { getAllCompanions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"

// Force dynamic rendering to allow server-side data fetching
export const dynamic = 'force-dynamic'

const Page = async () => {
  const companions = await getAllCompanions({limit:5,page:1});
  const recentSessionsCompanions = await getAllCompanions({limit:5,page:1});
  return(
  <main>
    <h1 className="text-2xl underline bg-amber-100">Popular Companions</h1>
    <section className="home-section">
      {companions.map((companion) =>(
        <CompanionCard 
        key={companion.id}
        {...companion}
        color={getSubjectColor(companion.subject)}
      />
      ))}
      
     
    
    </section>
    <section className="home-section">
      
      <CompanionsList 
      title="Recently Accessed Companions"
      companions={recentSessionsCompanions}
      classNames="w-2/3 max-lg:w-full"
      />
      <CTA/> 
    </section>
    </main>
  )
}

export default Page