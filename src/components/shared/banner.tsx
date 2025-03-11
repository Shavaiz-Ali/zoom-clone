import { cn } from "@/lib/utils";
import { getCurrentDate, getCurrentTime } from "@/utils";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[280px] sm:h-[303px] rounded-[20px] overflow-hidden">
      <Image
        src={"/banner.png"}
        alt="banner-image"
        sizes="(max-width:1200px) 100vw"
        fill
        // priority
        loading="lazy"
        className="object-cover object-center aspect-3/2"
      />
      <div className="absolute top-0 left-0 pl-6 sm:pl-11 pt-9 pb-8 w-full flex flex-col justify-between !z-30 h-full">
        <div className="py-2 px-3 flex justify-center items-center bg-[#FFFFFF0D]/5 rounded-[4px] w-[273px]">
          <p className="text-[1rem] leading-[22.4px] font-normal space-x-2 text-white">
            Upcoming Meeting at:
            <span>12:00</span>
          </p>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <p
            className={cn(
              "text-5xl sm:text-7xl font-bold leading-[72px] text-white"
            )}
          >
            {getCurrentTime().replace("AM", "").replace("PM", "")}
            <span className="text-2xl font-[500] leading-[30px] text-white -ml-[10px]">
              {getCurrentTime().includes("AM") ? "AM" : "PM"}
            </span>
          </p>
          <p className="text-xl sm:text-2xl font-[500] leading-[30px] text-white">
            {" "}
            {getCurrentDate()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
