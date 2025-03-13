/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUpcomingMeetings } from "@/actions/get-upcoming-meetings";
import PagesHeader from "@/components/shared/pages-header";
import UpcomingMeetingCard from "@/components/shared/upcoming-meeting-card";
import { MeetingOptionModelType } from "@/constants";
import React from "react";

export async function generateMetadata() {
  const title = "Upcoming Meeting Schedule";
  const description =
    "Stay updated with your upcoming video conferences and meeting details in your Zoom-like workspace";

  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: "Upcoming Video Conference Schedule",
      description:
        "Get ready for your next video meetings with schedules, participants, and details in your Zoom-style collaboration platform",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/upcoming-meetings`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Upcoming Video Meeting Schedule",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Upcoming Video Meeting Schedule",
      description:
        "Stay informed about your upcoming video conferences in your Zoom-inspired collaboration space",
      images: [""],
      creator: "@videoconfapp",
    },
  };
}
const UpcomingMeetings = async () => {
  const data = await getUpcomingMeetings();
  const parseData = data?.data ? JSON.parse(data.data) : null;

  return (
    <div className="space-y-12 w-full">
      <PagesHeader
        title="Upcoming meetings"
        modelTitle="Create Meeting"
        btnTitle="Schedule a meeting"
        type={MeetingOptionModelType.SCHEDULEMEETING}
      />

      {parseData && parseData?.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 w-full">
          {parseData.map((item: any) => (
            <UpcomingMeetingCard item={item} key={item._id} />
          ))}
        </div>
      ) : (
        <p className="text-[30px] font-bold leading-10 text-white">
          {data?.message ? data?.message : "No meeting scheduled yet!"}
        </p>
      )}
    </div>
  );
};

export default UpcomingMeetings;
