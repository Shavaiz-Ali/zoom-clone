/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Copy, Trash, Pencil, LucideProps } from "lucide-react";
import React, {
  RefAttributes,
  useState,
  startTransition,
  useCallback,
} from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
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

interface PersonalRoom {
  inviteLink: string;
  roomTitle: string;
  passcode: string;
  _id: string;
}

interface PersonalRoomActionsButtonProps {
  item: PersonalRoom;
}

const PersonalRoomActionsButton: React.FC<PersonalRoomActionsButtonProps> = ({
  item,
}) => {
  const { roomTitle, _id, passcode, inviteLink } = item;
  const [model, setModel] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [loadingActions, setLoadingActions] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();
  const path = usePathname();

  const [formData, setFormData] = useState({
    title: "",
    password: "",
  });

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
  const handleActions = useCallback(
    async (action: string) => {
      if (!action) return;

      setLoadingActions((prev) => ({ ...prev, [action]: true }));

      try {
        if (action === pRoomActions.START_MEETING) {
          setLoader(true);
          startTransition(() => {
            router.push(inviteLink);
            setLoader(false);
            console.log(`Navigating to: ${inviteLink}`);
          });
          return;
        }

        if (action === pRoomActions.COPY) {
          await navigator.clipboard.writeText(inviteLink);
          toast("Link copied successfully!");
        } else if (action === pRoomActions.DELETE) {
          const res = await axios.delete("/api/where-by/delete-personal-room", {
            data: { roomId: _id, path },
          });
          if (res.status === 200) {
            router.refresh();
            toast("Room Deleted Successfully");
            setModel(false);
          } else {
            console.error("Delete room failed with status:", res.status);
            toast("Failed to delete room.");
          }
        } else if (action === pRoomActions.Edit) {
          console.log(formData);
          if (formData.title.trim() === "" && formData.password.trim() === "") {
            toast("Fill the field to update!");
          }

          // const formdata = new FormData();
          // formdata.append("title", formData.title);
          // formdata.append("password", formData.password);

          const respone = await axios.post("/api/where-by/edit-personal-room", {
            title: formData.title,
            password:
              formData.password.trim() === "" ? passcode : formData.password,
            roomId: _id,
          });

          if (respone.status === 200) {
            toast("Rooom updated successfully");
            setModel(false);
            router.refresh();
          }
        }
      } catch (error: any) {
        toast("Something went wrong! Try again later.");
        console.error(
          "Error during action:",
          action,
          error.message,
          error.stack
        );
      } finally {
        setLoadingActions((prev) => ({ ...prev, [action]: false })); // End loading
      }
    },
    [inviteLink, path, router, _id, setModel, formData, passcode]
  );

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
            disabled={
              pRoomActions.START_MEETING === value.action
                ? loader
                : loadingActions[value.action]
            }
          >
            {pRoomActions.START_MEETING === value.action && loader && (
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
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default PersonalRoomActionsButton;
