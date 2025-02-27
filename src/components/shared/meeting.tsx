"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function WherebyMeeting({ meetingId }: { meetingId: string }) {
  const meetingUrl = `https://yoom.whereby.com/${meetingId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  return (
    <div className="h-full">
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
    </div>
  );
}
