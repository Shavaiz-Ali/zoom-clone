"use client";

import { Copy, Trash, Pencil, LucideProps } from "lucide-react";
import React, { RefAttributes, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import axios from "axios";
import ActionConfirmModel from "./confirm-model";

export const enum pRoomActions {
  START_MEETING = "start",
  COPY = "Copy",
  DELETE = "Delete",
  Edit = "Edit",
}

interface buttonsDataTypes {
  title: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  action: string;
}

interface PersonalRoomActionsButtonProps {
  inviteLink: string;
  roomId: string;
  passcode: string;
  title: string;
}

const PersonalRoomActionsButton: React.FC<PersonalRoomActionsButtonProps> = ({
  inviteLink,
  roomId,
  passcode,
  title,
}) => {
  const [model, setModel] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null); // Stores the clicked action type
  const [loader, setLoader] = useState<boolean>(false);
  const path = usePathname();

  const buttonsData: buttonsDataTypes[] = [
    {
      title: "Start a meeting",
      action: pRoomActions.START_MEETING,
    },
    {
      title: "Copy Invitation",
      icon: Copy,
      action: pRoomActions.COPY,
    },
    {
      title: "Edit",
      icon: Pencil,
      action: pRoomActions.Edit,
    },
    {
      title: "Delete",
      icon: Trash,
      action: pRoomActions.DELETE,
    },
  ];

  // Actions
  const handleActions = async (action: string) => {
    if (!action) return;

    try {
      if (action === pRoomActions.COPY) {
        await navigator.clipboard.writeText(inviteLink);
        toast("Link copied successfully!");
      } else if (action === pRoomActions.DELETE) {
        setLoader(true);
        const res = await axios.delete("/api/where-by/delete-personal-room", {
          data: { roomId, path },
        });
        console.log(res);
        if (res.status === 200) {
          setLoader(false);
          setModel(false);
          toast("Room Deleted Successfully");
        }
      }
    } catch (error) {
      toast("something went wrong! try again later");
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center w-full gap-2">
        {buttonsData.map((value) => (
          <Button
            key={value.title}
            className={cn(
              "px-5 py-3 text-[14px] font-semibold text-white leading-5 bg-blue-1 rounded-[4px]",
              {
                "flex justify-center items-center gap-x-2 text-sky-1":
                  value.icon,
                "bg-transparent border border-dark-3":
                  value.action === pRoomActions.DELETE ||
                  value.action === pRoomActions.Edit,
                "bg-dark-3": value.action === pRoomActions.COPY,
              }
            )}
            onClick={() => {
              if (
                value.action === pRoomActions.DELETE ||
                value.action === pRoomActions.Edit
              ) {
                setSelectedAction(value.action);
                setModel(true);
                return;
              }

              handleActions(value.action);
            }}
          >
            {value.icon && (
              <span>
                <value.icon size={12} />
              </span>
            )}
            <span>{value.title}</span>
          </Button>
        ))}
      </div>

      {model && selectedAction && (
        <ActionConfirmModel
          model={model}
          setModel={setModel}
          type={selectedAction}
          loader={loader}
          handleActions={handleActions}
          passcode={passcode}
          title={title}
        />
      )}
    </>
  );
};

export default PersonalRoomActionsButton;
