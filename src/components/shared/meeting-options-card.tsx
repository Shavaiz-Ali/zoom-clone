"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MeetingCardModel from "./meeting-card-model";
import { MeetingOptionModelType } from "@/constants";

interface MeetingOptionsCardProps {
  id: number;
  title: string;
  description: string;
  color: string;
  iconPath: string;
  link?: string;
  modelTitle?: string;
  modelBtnText?: string;
  modelType?: MeetingOptionModelType;
}

const MeetingOptionsCard = ({
  option,
}: {
  option: MeetingOptionsCardProps;
}) => {
  const router = useRouter();
  const [model, setModel] = useState<boolean>(false);
  return (
    <>
      <Card
        className={cn(
          "px-6 py-5 h-[280px] !border-none cursor-pointer",
          option.color
        )}
        onClick={() => {
          if (option.link) {
            router.push(option.link);
          } else {
            setModel(true);
          }
        }}
      >
        <CardContent className="p-0 flex flex-col justify-between items-start h-full w-full">
          <div className="size-14 p-2 flex justify-center items-center rounded-lg bg-white/30 ">
            <Image
              src={option.iconPath}
              alt="icon"
              width={30}
              height={30}
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl leading-8 font-bold text-white">
              {option.title}
            </h1>
            <p className="text-[18px] leading-6 font-normal text-[#ECF0FF]">
              {option.description}
            </p>
          </div>
        </CardContent>
      </Card>
      {model && (
        <MeetingCardModel
          model={model}
          setModel={setModel}
          type={option.modelType}
          title={option.modelTitle}
          btnTitle={option.modelBtnText}
        />
      )}
    </>
  );
};

export default MeetingOptionsCard;
