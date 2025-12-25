import Link from "next/link"
import Image from "next/image";
import NavItems from "./NavItems";
const Navbar = () => {
  return (<>
  <nav className="navbar">
    <div className="flex items-center gap-8">
      <Link href='/' className="flex items-center gap-2.5 cursor-pointer">
        <Image src="images/logo.svg" alt="logo" width={46} height={44} />
      </Link>

      <NavItems/>
      <p>Sign-In</p>
    </div>
  </nav>
  </>
  )
}

export default Navbar