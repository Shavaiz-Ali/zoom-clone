"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpcomingMeetingsActionButton = ({
  item,
}: {
  item: { inviteLink: string };
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const handleStartMeeting = async () => {
    setLoader(true);

    await new Promise(() => {
      setTimeout(() => {
        setLoader(false);
        toast.success("Meeting created!");
        router.push(item.inviteLink);
      }, 2000);
    });
  };

  return (
    <div className="flex items-center gap-x-2 ">
      <Button
        className=" h-10 py-2 px-5 bg-blue-1 rounded-[4px] text-[16px] font-semibold text-white"
        onClick={() => handleStartMeeting()}
        disabled={loader}
      >
        {loader && (
          <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1 animate-spin" />
        )}
        Start
      </Button>
      <Button
        className="shrink h-10 py-2 px-5 bg-dark-3 rounded-[4px] text-[16px] font-semibold text-white flex justify-center items-center gap-x-2 "
        onClick={async () => {
          await navigator.clipboard.writeText(item?.inviteLink);
          toast.success("Link copied successfuly!");
        }}
      >
        <Copy />
        Copy invitation
      </Button>
    </div>
  );
};

export default UpcomingMeetingsActionButton;
