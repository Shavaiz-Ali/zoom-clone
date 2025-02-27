/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

// import { getPreviousMeetings } from "@/actions/previous-meetings";
// import { useActionState } from "react";

const extractTimeAndDate = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedDate = `${start.toLocaleString("en-US", {
    month: "long",
  })} ${start.getDate()}, ${start.getFullYear()}`;
  const startTime = start
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");
  const endTime = end
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");

  return `${formattedDate} - ${startTime} - ${endTime}`;
};

const PreviousMeetingsCard = ({ item }: any) => {
  // const {state, null, isPending} = useActionState(getPreviousMeetings, null);

  // console.log(state, isPending);

  return (
    <Card className="py-8 px-7 bg-dark-1 w-full rounded-[14px] space-y-9 border-none">
      <div className="space-y-[14px]">
        <Image src={"/nav/3.svg"} alt="previous icon" width={30} height={30} />
        <h1 className="text-2xl leading-8 font-bold text-sky-3 line-clamp-1 w-full">
          {item.meetingTitle}
        </h1>
        <p className="text-[16px] font-medium leading-5 text-sky-2">
          {extractTimeAndDate(item.startDate, item.endDate)}
        </p>
      </div>
      <div className="relative flex w-full max-sm:hidden mt-9">
        {item.participants &&
          item.participants.length > 0 &&
          item.participants
            .slice(0, 5)
            ?.map((user: any, index: any) => (
              <Image
                key={index}
                src={user.imageUrl}
                alt="attendees"
                width={40}
                height={40}
                className={cn("rounded-full", { absolute: index > 0 })}
                style={{ top: 0, left: index * 28 }}
              />
            ))}
        {item.participants && item.participants.length > 5 && (
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        )}
      </div>
    </Card>
  );
};

export default PreviousMeetingsCard;
