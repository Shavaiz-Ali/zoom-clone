"use client";

import { Copy, Trash, Pencil, LucideProps } from "lucide-react";
import React, { RefAttributes, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import ActionConfirmModel from "./confirm-model";
import { useCreateMeeting } from "@/hooks/useCreateMeeting";

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
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [loadingActions, setLoadingActions] = useState<{
    [key: string]: boolean;
  }>({});
  const { createMeeting } = useCreateMeeting();
  const router = useRouter();
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

    setLoadingActions((prev) => ({ ...prev, [action]: true }));

    try {
      if (action === pRoomActions.COPY) {
        await navigator.clipboard.writeText(inviteLink);
        toast("Link copied successfully!");
      } else if (action === pRoomActions.DELETE) {
        const res = await axios.delete("/api/where-by/delete-personal-room", {
          data: { roomId, path },
        });
        if (res.status === 200) {
          toast("Room Deleted Successfully");
          setModel(false);
        }
      } else if (action === pRoomActions.START_MEETING) {
        const personal = true;
        const response = await createMeeting(title, personal, passcode, roomId);
        if (response.status === 201) {
          toast("Meeting has been created!");
          setModel(false);
          router.push(
            `/meeting/${response.data.roomName.replace("/", "")}?personal=true`
          );
        }
      }
    } catch (error) {
      toast("Something went wrong! Try again later.");
      console.error(error);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [action]: false }));
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
            disabled={loadingActions[value.action]} // Disable button while loading
          >
            {loadingActions[value.action] && (
              <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1 animate-spin" />
            )}
            {value.icon && !loadingActions[value.action] && (
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
          loader={loadingActions[selectedAction]}
          handleActions={handleActions}
          passcode={passcode}
          title={title}
        />
      )}
    </>
  );
};

export default PersonalRoomActionsButton;
