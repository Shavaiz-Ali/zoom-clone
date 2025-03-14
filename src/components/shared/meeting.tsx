"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ConfirmPasswordModel from "./confirm-password";

export default function WherebyMeeting({
  meetingId,
  token,
  data,
  roomId,
}: {
  meetingId: string;
  token: string | undefined;
  data: { status: number };
  roomId: string | undefined;
}) {
  const meetingUrl = `https://yoom.whereby.com/${meetingId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [model, setModel] = useState(false); // Initialize model to false

  const router = useRouter();

  useEffect(() => {
    const handleMeetingLeave = (event: MessageEvent) => {
      if (event.origin !== "https://yoom.whereby.com") return;

      // Check if the user left the meeting
      if (event.data.type === "leave") {
        window.location.href = "/";
      }
    };

    window.addEventListener("message", handleMeetingLeave);

    return () => {
      window.removeEventListener("message", handleMeetingLeave);
    };
  }, [router]);

  // const verifyRoom = async () => {
  //   try {
  //     const response = await VerifyPersonalRooms(meetingId);
  //     // Assuming VerifyPersonalRooms returns a NextResponse, check response.json() and then status
  //     const data = await JSON.parse(response);
  //     console.log(data);
  //     if (data.status === 200) {
  //       setIsPersonal(true);
  //       setModel(true); // Open the modal when the room is personal
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (data && data?.status === 200 && token) {
      setModel(true);
    }
  }, []);

  return (
    <div className="h-full">
      {model ? (
        <ConfirmPasswordModel
          token={token}
          model={model}
          setModel={setModel}
          roomId={roomId}
        />
      ) : (
        <>
          {meetingUrl && (
            <div className="h-full">
              {/* <h3 className="text-lg font-bold">Join Meeting:</h3>
              <a
                href={meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {meetingUrl}
              </a> */}
              <iframe
                ref={iframeRef}
                src={meetingUrl}
                width="100%"
                allow="camera; microphone; fullscreen"
                className="rounded min-h-screen !bg-dark-1"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
