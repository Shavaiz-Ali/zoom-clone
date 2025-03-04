import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

import SidebarMobile from "./sidebar-mobile";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 bg-dark-1 h-[72px] w-full flex justify-between items-center px-4 sm:px-6 lg:px-14 z-40">
      <div className="lg:block hidden" />
      <div className="px-2 lg:hidden block">
        <Image
          className="hidden sm:block"
          src="/logo.png"
          width={100}
          height={40}
          alt="logo"
        />
        <Image
          className="block sm:hidden"
          src="/logo-mobile.svg"
          width={40}
          height={40}
          alt="logo"
        />
      </div>
      <div className="flex justify-center items-center space-x-3">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SidebarMobile />
      </div>
    </div>
  );
};

export default Header;
