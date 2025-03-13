"use client";

import React from "react";
import { Card } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface MeetingCreatedBannerProps {
  model: boolean;
  setModel: (value: boolean) => void;
  link: string;
}

const MeetingCreatedBanner: React.FC<MeetingCreatedBannerProps> = ({
  model,
  setModel,
  link,
}) => {
  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogContent className="flex w-[95%] max-w-[520px] flex-col gap-6 border-none bg-dark-2 px-6 py-9 text-white">
        <Card className="p-0 flex flex-col gap-y-9 border-none">
          <div className="flex flex-col justify-center items-center gap-y-3">
            <Image src={"/icons/tick.svg"} height={72} width={72} alt="tick" />
          </div>
          <div className="space-y-5">
            <Button
              className="bg-blue-1 rounded-[4px] py-2 px-5 text-white text-[16px] font-[500] leading-[22px] w-full -3 focus-visible:ring-0 focus-visible:ring-offset-0 flex justify-center items-center gap-x-2"
              onClick={async () => {
                await navigator.clipboard.writeText(link);
                toast.success("Link copied successfully!");
              }}
            >
              <span>
                {" "}
                <Copy />
              </span>
              <span>Copy invitation</span>
            </Button>
            <Button
              className="bg-dark-3 rounded-[4px] py-2 px-5 text-white text-[16px] font-[500] leading-[22px] w-full -3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => setModel(false)}
            >
              <span>Close</span>
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingCreatedBanner;
