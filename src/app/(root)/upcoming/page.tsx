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
  // const data = await

  return <div></div>;
};

export default UpcomingMeetings;
