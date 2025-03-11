/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerifyPersonalRooms } from "@/actions/verify-personal-room";
import WherebyMeeting from "@/components/shared/meeting";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const title = "Join Live Video Conference";
  const description =
    "Participate in real-time video meetings and collaborative sessions in your Zoom-style workspace";
  const param = await params;
  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: `Live Meeting: ${param.meetingId}`,
      description:
        "Join active video conference with screen sharing, chat, and collaboration features",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${param.meetingId}`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Live Video Conference",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Join Live Video Meeting",
      description:
        "Connect with participants in real-time through secure video conferencing",
      images: [""],
      creator: "@videoconfapp",
    },
  };
}

interface MeetingProps {
  params: Promise<{ meetingId: string } | any>;
  searchParams: Promise<{ token?: string | undefined }>;
}

const Meeting: React.FC<MeetingProps> = async ({ params, searchParams }) => {
  const searchParamsResolved = await searchParams;
  const { token } = searchParamsResolved;
  const { meetingId } = await params;

  const response = await VerifyPersonalRooms(meetingId);
  const data = JSON.parse(response);

  return (
    <div className="w-full">
      <WherebyMeeting data={data} meetingId={meetingId} token={token} />
    </div>
  );
};

export default Meeting;
