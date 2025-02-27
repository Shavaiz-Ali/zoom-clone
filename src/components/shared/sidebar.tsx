"use client";

import { sidebarData } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathnane = usePathname();

  const isActiveTab = (link: string) => {
    if (pathnane === link) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="px-5 py-4 bg-dark-1 w-[264px] min-h-screen hidden lg:block overflow-hidden">
        <div className="px-2">
          <Image src="/logo.png" width={124} height={40} alt="logo" />
        </div>
        <div className="space-y-3 mt-12">
          {sidebarData.map(({ title, link, icon, id }) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
