import React from "react";
import PersonalRoomModel from "./personal-room-model";

interface PagesHeader {
  title: string;
  btnTitle: string;
  modelTitle: string;
  type: string;
}

const PagesHeader: React.FC<PagesHeader> = ({
  title,
  modelTitle,
  btnTitle,
  type,
}) => {
  return (
    <div className="flex items-start justify-between space-x-4">
      <h1 className="text-[24px] md:text-[30px] lg:text-[42px] font-bold leading-10 text-white">
        {title}
      </h1>
      <PersonalRoomModel
        btnTitle={btnTitle}
        type={type}
        modelTitle={modelTitle}
      />
    </div>
  );
};

export default PagesHeader;
