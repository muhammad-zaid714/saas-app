"use client"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { subjects } from "@/constants"

const SubjectFilter = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSubject = searchParams?.get("subject") ?? ""
  const [selectedSubject, setSelectedSubject] = useState(initialSubject)

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedSubject(value)
    
    setTimeout(() => {
      if (value) {
        const newUrl = formUrlQuery({
          params: searchParams?.toString() ?? "",
          key: "subject", 
          value: value,
        })
        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams?.toString() ?? "",
            keysToRemove: ["subject"],
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)
  }

  return (
    <div className="relative my-4 w-fit">
      <select
        value={selectedSubject}
        onChange={handleSubjectChange}
        className="min-w-[150px] border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 cursor-pointer hover:border-gray-400"
      >
        <option value="" className="text-gray-500">All Subjects</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject} className="text-gray-700">
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SubjectFilter