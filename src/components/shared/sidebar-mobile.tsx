"use client";

import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { sidebarData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SidebarMobile = () => {
  const pathnane = usePathname();
  const [sidebar, setSidebar] = useState(false);

  const isActiveTab = (link: string) => {
    if (pathnane === link) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const closeSidebar = () => {
      if (window.innerWidth >= 1024) {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", closeSidebar);
    return () => {
      window.removeEventListener("resize", closeSidebar);
    };
  }, []);

  return (
    <div className="lg:hidden block">
      <Sheet open={sidebar} onOpenChange={setSidebar}>
        <SheetTrigger asChild>
          <Button className="p-0 border-0 outline-none ">
            <span>
              <Menu size={30} className="text-white" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="px-5 py-4 bg-dark-1 z-[99999]">
          <SheetHeader>
            <div className="px-2">
              <Image src="/logo.png" width={124} height={40} alt="logo" />
            </div>
          </SheetHeader>
          <div className="space-y-3 mt-12">
            {sidebarData.map(({ title, link, icon, id }) => (
              <div className="" key={id} onClick={() => setSidebar(false)}>
                <Link
                  href={link}
                  className={cn("flex p-4 gap-4 w-full rounded-[8px]", {
                    "bg-blue-1": isActiveTab(link),
                  })}
                  key={id}
                >
                  <Image src={icon} alt="" width={24} height={24} />
                  <span className="text-[18px] font-semibold leading-6 text-white">
                    {title}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarMobile;
