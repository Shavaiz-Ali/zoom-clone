/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { pRoomActions } from "./personal-room-action-buttons";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { verifyToken } from "@/actions/verify-token";
import { getPersonalRoom } from "@/actions/get-single-room";
import { toast } from "sonner";

interface ConfirmPasswordModelProps {
  model: boolean;
  token: string | undefined;
  setModel: (value: boolean) => void;
}

const ConfirmPasswordModel: React.FC<ConfirmPasswordModelProps> = ({
  model,
  token,
  setModel,
}) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const MAX_RETRIES = 3; // Set a limit to prevent infinite retries

  const handleEarlyVerification = React.useCallback(async () => {
    if (!token) return;
    setLoader(true);

    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const decodedResponse = await verifyToken(token);
        const decodedData = JSON.parse(decodedResponse);

        if (decodedData.status === 401) {
          toast("Room has expired!");
          setLoader(false);
          console.log(decodedData.message || "Token verification failed.");
          return;
        }

        const meetingId = decodedData.decoded.meetingId;
        const storedTokenKey = `roomToken_${meetingId}`;
        const storedToken = localStorage.getItem(storedTokenKey);

        if (storedToken === token) {
          toast.success("Password verification successful!");
          setLoader(false);
          setModel(false);
          return;
        }

        const roomResponse = await getPersonalRoom(meetingId);
        const roomData = JSON.parse(roomResponse);

        if (roomData.status === 200) {
          toast.success("Password verification successful!");
          localStorage.setItem(storedTokenKey, token);
          setPassword(roomData.passcode);
          setTimeout(() => {
            setLoader(false);
            setModel(false);
          }, 2000);
          return;
        } else {
          throw new Error(roomData.message || "Password verification failed.");
        }
      } catch (error) {
        console.error("Error during verification attempt:", error);

        if (retries === MAX_RETRIES - 1) {
          toast.error("Verification failed after multiple attempts.");
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
        }

        retries++;
      }
    }

    setLoader(false);
  }, [token, setLoader, setModel, setPassword]);

  useEffect(() => {
    if (token) {
      handleEarlyVerification();
    }
  }, [handleEarlyVerification]);

  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogContent
        className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-2 px-6 py-9 text-white"
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="p-0">
          <DialogTitle
            className={cn(
              "text-[30px] font-bold leading-10 text-white text-center"
            )}
          >
            Enter your password
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            className="py-[10px] px-3 w-full border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 h-[40px] rounded-[4px] text-white text-sm font-medium placeholder:text-slate-500"
            placeholder={"Password"}
            value={password}
            disabled={loader}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 left-[92%] w-full"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {!showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <div className="w-full">
          <Button
            type="button"
            variant="secondary"
            className={cn(
              "bg-blue-1 rounded-[4px] py-2 px-5 text-white text-[16px] font-[500] leading-[22px] w-full -3 focus-visible:ring-0 focus-visible:ring-offset-0 "
              // {
              //   "flex justify-center items-center gap-x-2": loader,
              // }
            )}
            // onClick={() => handleActions(type)}
            disabled={loader}
          >
            {loader && (
              <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1  animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPasswordModel;
