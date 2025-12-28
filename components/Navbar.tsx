import Link from "next/link"
import Image from "next/image";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (<>
  <nav className="navbar">
    <div className="flex items-center gap-8">
      <Link href='/' className="flex items-center gap-2.5 cursor-pointer">
        <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
      </Link>

      <NavItems/>
      <SignedOut>
       <SignInButton>
        <button className="btn-signin">Sign In</button>
       </SignInButton>
      </SignedOut>
      <SignedIn>
         <UserButton />
      </SignedIn>
    </div>
  </nav>
  </>
  ) 
}

export default Navbar