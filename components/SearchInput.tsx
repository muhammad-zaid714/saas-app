"use client"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
const SearchInput = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams?.get("topic") ?? ""
  const [searchQuery, setSearchQuery] = useState(query)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams?.toString() ?? "",
        key: "topic",
        value: searchQuery,
      })
      router.push(newUrl, { scroll: false })
    } else {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams?.toString() ?? "",
          keysToRemove: ["topic"],
        })

        router.push(newUrl, { scroll: false })
      }
    }
    }, 1000)
    
  }, [searchQuery, router, pathname, searchParams])
  return (
    <div className="relative border border-gray-300 rounded-lg items-center flex gap-3 py-2 px-4 my-4 w-fit bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 hover:border-gray-400">
        <Image src = "/icons/search.svg" alt="search" width={16} height={16} className="text-gray-400" />
        <input  placeholder="Search companions..."
        value={searchQuery}
        className="outline-none w-48 text-gray-700 placeholder-gray-500"
        onChange={(e)=>setSearchQuery(e.target.value)} />
    </div>
  )
}

export default SearchInput