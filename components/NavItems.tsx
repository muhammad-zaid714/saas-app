'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"


const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Companions', href: '/companions'},
    {label: 'My Journey', href: '/myjourney'},
]

const NavItems = () => {
  const pathname = usePathname()
  return (
    <nav className='flex items-center gap-8 '> 
        {navItems.map(({label, href}) => (
          <Link 
          key={href} 
          href={href}
          className={cn(pathname === href ? 'text-black-600 font-semibold' : 'text-gray-700', 'hover:text-purple-500 transition-colors')}
          >{label}</Link>
        ))}
    </nav>
  )
}

export default NavItems;