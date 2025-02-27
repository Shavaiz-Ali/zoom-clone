import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 bg-dark-1 h-[72px] w-full flex justify-between items-center px-4 sm:px-6 lg:px-14 z-40">
      <div className="lg:block hidden" />
      <div className="px-2 lg:hidden block">
        <Image src="/logo.png" width={124} height={40} alt="logo" />
      </div>
      <div className="s">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
