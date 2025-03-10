"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MeetingCardModel from "./meeting-card-model";
const PersonalRoomModel = ({
  btnTitle,
  type,
}: {
  btnTitle: string;
  type: string;
}) => {
  const [model, setModel] = useState<boolean>(false);

  return (
    <>
      <Button
        className="bg-dark-3 py-[10px] px-5 space-x-1 border-none outline-none "
        onClick={() => setModel(true)}
      >
        <span>
          <Image src={"/nav/5.svg"} alt="plus" width={17} height={17} />
        </span>
        <span className="sm:block hidden text-[16px] font-semibold leading-5 text-white">
          {btnTitle}
        </span>
      </Button>
      <MeetingCardModel
        model={model}
        setModel={setModel}
        type={type}
        title="Create Personal Room"
        btnTitle="Create room"
      />
    </>
  );
};

export default PersonalRoomModel;
