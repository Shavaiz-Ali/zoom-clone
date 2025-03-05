/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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

interface ConfirmPasswordModelProps {
  model: boolean;
  token: string;
  setModel: (value: boolean) => void;
}

const ConfirmPasswordModel: React.FC<ConfirmPasswordModelProps> = ({
  model,
  token,
  setModel,
}) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEarlyVerification = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

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
            // disabled={loader}
          >
            {/* {loader && (
            <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1  animate-spin" />
          )} */}
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPasswordModel;
