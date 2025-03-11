import { VerifyPersonalRooms } from "@/actions/verify-personal-room";
import WherebyMeeting from "@/components/shared/meeting";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { meetingId: string };
}) {
  const title = "Join Live Video Conference";
  const description =
    "Participate in real-time video meetings and collaborative sessions in your Zoom-style workspace";

  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: `Live Meeting: ${params.meetingId}`,
      description:
        "Join active video conference with screen sharing, chat, and collaboration features",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${params.meetingId}`,
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

const Meeting = async ({
  params,
  searchParams,
}: {
  params: { meetingId: string };
  searchParams: { token?: string };
}) => {
  const { token } = searchParams;
  const { meetingId } = params;

  const response = await VerifyPersonalRooms(meetingId);
  const data = JSON.parse(response);

  return (
    <div className="w-full">
      <WherebyMeeting data={data} meetingId={meetingId} token={token} />
    </div>
  );
};

export default Meeting;
