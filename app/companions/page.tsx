import CompanionCard from "@/components/CompanionCard"
import SearchInput from "@/components/SearchInput"
import SubjectFilter  from "@/components/SubjectFilter"
import { getAllCompanions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"

// Force dynamic rendering to allow server-side data fetching
export const dynamic = 'force-dynamic'

const CompanionsLibrary = async({searchParams}:SearchParams) => {
  const filters = await searchParams
  const subject = filters?.subject || ''
  const topic = filters?.topic || ''
  const companions = await getAllCompanions({subject, topic, limit: 20, page: 1})
  console.log(companions)
  return (
   <main>
    <section>
      <div className="flex justify-between items-center gap-4 max-sm:flex-col">
        <h1>Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput/>
          <SubjectFilter/>
        </div>
      </div>
      <section className="companions-grid">
        {
          companions.map((companion)=>(
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
          ))
        }
      </section>
    </section>
   </main>
  )
}

export default CompanionsLibrary