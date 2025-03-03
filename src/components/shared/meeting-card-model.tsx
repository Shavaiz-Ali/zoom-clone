/* eslint-disable @typescript-eslint/no-unused-vars */
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MeetingOptionModelType } from "@/constants";
import { Textarea } from "../ui/textarea";
import { useCreateMeeting } from "@/hooks/useCreateMeeting";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface MeetingCardModelProps {
  model: boolean;
  setModel: (model: boolean) => void;
  type: string | undefined;
  title: string | undefined;
  btnTitle: string | undefined;
}

const MeetingCardModel = ({
  model,
  setModel,
  type,
  title,
  btnTitle,
}: MeetingCardModelProps) => {
  const [values, setValues] = useState({
    description: "",
    time: "",
    meetingLink: "",
    meetingTitle: "",
    roomTitle: "",
    passcode: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { createMeeting, loader, setLoader } = useCreateMeeting();
  const router = useRouter();
  const path = usePathname();

  // API call handler
  const handleActions = async () => {
    try {
      setLoader(true);

      if (type === MeetingOptionModelType.NEWMEETING) {
        if (!values.meetingTitle.trim()) {
          toast("Meeting title is required");
          return;
        }
        const res = await createMeeting(values.meetingTitle);
        if (res.status === 201) {
          toast("Meeting has been created!");
          setModel(false);
          router.push(`/meeting/${res.data.roomName.replace("/", "")}`);
        }
      } else if (type === MeetingOptionModelType.JOINMEETING) {
        const roomName = values.meetingLink.split("/")[4];
        if (!values.meetingLink || !roomName) {
          toast("Please enter a valid meeting link");
          return;
        }
        const { status } = await axios.post(
          `/api/where-by/join-meeting?meetingId=${roomName}`
        );
        if (status === 200) {
          toast("Meeting has been joined!");
          setModel(false);
          router.push(`/meeting/${roomName}`);
        }
      } else if (type === MeetingOptionModelType.PERSONALROOM) {
        if (!values.roomTitle.trim() || !values.passcode.trim()) {
          toast("All fields are required!");
          return;
        }
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!BASE_URL) return;
        const inviteLink = `${BASE_URL}`;
        const meetingId = Math.floor(10000000 + Math.random() * 90000000);
        await axios.post("/api/where-by/create-personal-room", {
          pathToRevalidate: path,
          roomTitle: values.roomTitle,
          passcode: values.passcode,
          inviteLink,
          meetingId,
        });
        toast("Personal room created successfully");
        setModel(false);
      }
    } catch (error) {
      console.error("Meeting Action Error:", error);
      toast("An error occurred while processing your request");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog open={model} onOpenChange={setModel}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-2 px-6 py-9 text-white">
        <DialogHeader className="p-0">
          <DialogTitle
            className={cn("text-[30px] font-bold leading-10 text-white", {
              "text-center":
                type === MeetingOptionModelType.JOINMEETING ||
                type === MeetingOptionModelType.NEWMEETING ||
                type === MeetingOptionModelType.PERSONALROOM,
            })}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          {(type === MeetingOptionModelType.JOINMEETING ||
            type === MeetingOptionModelType.NEWMEETING ||
            type === MeetingOptionModelType.PERSONALROOM) && (
            <Input
              type="text"
              name="link"
              className="py-[10px] px-3 w-full border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 h-[40px] rounded-[4px] text-white text-sm font-medium placeholder:text-slate-500"
              placeholder={
                type === MeetingOptionModelType.JOINMEETING
                  ? "Meeting link"
                  : type === MeetingOptionModelType.NEWMEETING
                  ? "Meeting Title"
                  : "Room title"
              }
              value={
                type === MeetingOptionModelType.JOINMEETING
                  ? values.meetingLink
                  : type === MeetingOptionModelType.NEWMEETING
                  ? values.meetingTitle
                  : values.roomTitle
              }
              onChange={(e) => {
                if (type === MeetingOptionModelType.JOINMEETING) {
                  setValues({ ...values, meetingLink: e.target.value });
                } else if (type === MeetingOptionModelType.NEWMEETING) {
                  setValues({ ...values, meetingTitle: e.target.value });
                } else {
                  setValues({ ...values, roomTitle: e.target.value });
                }
              }}
            />
          )}
          {type === MeetingOptionModelType.PERSONALROOM && (
            <div className="relative mt-3 w-full ">
              <Input
                type={showPassword ? "text" : "password"}
                name="link"
                className="py-[10px] px-3 w-full border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 h-[40px] rounded-[4px] text-white text-sm font-medium placeholder:text-slate-500"
                placeholder={"Add a password"}
                value={values.passcode}
                onChange={(e) =>
                  setValues({ ...values, passcode: e.target.value })
                }
              />
              <button
                className="absolute top-1/2 -translate-y-1/2 left-[92%] w-full"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          )}

          {type === MeetingOptionModelType.SCHEDULEMEETING && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-[16px] font-normal leading-5 text-sky-2"
                >
                  Add a description
                </Label>
                <Textarea
                  name="description"
                  id="description"
                  className=" border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 h-[40px] rounded-[4px] text-white text-sm font-medium"
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Select Date and Time
                </label>
                <ReactDatePicker
                  // selected={"hjkds"}
                  onChange={(date) =>
                    // setValues({ ...values, dateTime: date! })
                    {}
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            className={cn(
              "bg-blue-1 rounded-[4px] py-2 px-5 text-white text-[16px] font-[500] leading-[22px] w-full -3 focus-visible:ring-0 focus-visible:ring-offset-0 ",
              {
                "flex justify-center items-center gap-x-2": loader,
              }
            )}
            onClick={() => handleActions()}
            disabled={loader}
          >
            {loader && (
              <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1  animate-spin" />
            )}
            {btnTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingCardModel;
