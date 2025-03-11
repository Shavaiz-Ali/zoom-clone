/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPreviousMeetings } from "@/actions/previous-meetings";
import PagesHeader from "@/components/shared/pages-header";
import { MeetingOptionModelType } from "@/constants";
import dynamic from "next/dynamic";

const PreviousMeetingsCard = dynamic(
  () => import("@/components/shared/previous-meeting-card"),
  {
    loading: () => (
      <div className="h-6 w-6 rounded-full border-2 border-t-white border-dark-1  animate-spin" />
    ),
  }
);

export async function generateMetadata() {
  const title = "Previous Meeting History";
  const description =
    "Review past video conferences and meeting details in your Zoom-like workspace";

  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: "Video Conference Archive",
      description:
        "Access recordings, participants, and details from previous video meetings in your Zoom-style collaboration platform",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/previous-meetings`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Video Meeting History",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Video Meeting Archive",
      description:
        "Review past video conferences in your Zoom-inspired collaboration space",
      images: [""],
      creator: "@videoconfapp",
    },
  };
}

const PreviousMeetings = async () => {
  const fetchMeetings: any = await getPreviousMeetings();
  const data = JSON.parse(fetchMeetings);
  return (
    <div className="space-y-12 w-full">
      <PagesHeader
        title="Previous Meetings"
        type={MeetingOptionModelType.NEWMEETING}
        btnTitle="Launch New Conference"
      />
      {data?.data && data?.data?.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6 w-full">
            {data?.data?.map((item: any) => (
              <PreviousMeetingsCard
                item={item}
                key={item.id}
                description={`${item.duration} minute video conference with ${item.participantCount} participants`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-[30px] font-bold leading-10 text-white">
            No past conferences found
          </p>
          <p className="text-lg text-gray-300">
            Start a new video meeting to connect with your team!
          </p>
        </div>
      )}
    </div>
  );
};

export default PreviousMeetings;
