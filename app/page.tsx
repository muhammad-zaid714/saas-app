import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { Button } from "@/components/ui/button"
import { recentSessions } from "@/constants"

const Page = () => {
  return(
  <main>
    <h1 className="text-2xl underline bg-amber-100">Popular Companions</h1>
    <section className="home-section">
      <CompanionCard 
      id="1"
      name = 'Neura the Brainy Explorer'
      topic = 'Neural Network of the Brain'
      subject = 'science'
      duration = {15} 
      color = '#ffface'
      />
      <CompanionCard 
      id="456"
      name = 'Countsy the Number Wizard'
      topic = 'Magical World of Numbers'
      subject = 'math'
      duration = {45} 
      color = '#e0f7fa'
      />
      <CompanionCard 
      id=" 789"
      name = 'Verba the Vocabulary Builder'
      topic = 'New Words Adventure'
      subject = 'language'
      duration = {30} 
      color = '#f3e5f5'
      />
    
    </section>
    <section className="home-section">
      
      <CompanionsList 
      title="Recently Accessed Companions"
      companions={recentSessions}
      classNames="w-2/3 max-lg:w-full"
      />
      <CTA/> 
    </section>
    </main>
  )
}

export default Page