/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { formatDate, formatTime } from "@/utils";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import UpcomingMeetingsActionButton from "./upcoming-meeting-action.buttons";

const UpcomingMeetingCard = ({ item }: any) => {
  return (
    <Card className="py-8 px-7 bg-dark-1 w-full rounded-[14px] space-y-9 border-none">
      <CardContent className="p-0">
        <div className="space-y-[14px]">
          <Image
            src={"/nav/2.svg"}
            alt="previous icon"
            width={30}
            height={30}
            priority
          />
          <CardTitle className="text-2xl leading-8 font-bold text-sky-3 line-clamp-1 w-full">
            {item?.description}
          </CardTitle>
          <CardDescription className="text-[16px] font-medium leading-5 text-sky-2 space-x-2">
            <span>{formatDate(item.startDate)}</span>
            <span>-</span>
            <span>{formatTime(item.startTime)}</span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-0 flex justify-between items-center gap-x-3">
        <div className="relative flex  max-sm:hidden shrink-0">
          {item.participants &&
            item.participants.length > 0 &&
            item.participants
              .slice(0, 3)
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
        <UpcomingMeetingsActionButton item={item} />
      </CardFooter>
    </Card>
  );
};

export default UpcomingMeetingCard;
