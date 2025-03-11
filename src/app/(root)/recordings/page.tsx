import React from "react";

export async function generateMetadata() {
  const title = "Meeting Recordings Library";
  const description =
    "Access and manage recorded video conferences from previous meetings in your workspace";

  return {
    title: `${title}${description ? ` - ${description}` : ""}`,
    description,
    openGraph: {
      title: "Meeting Recordings Repository",
      description:
        "Review and manage recorded video conferences with full playback capabilities and participant details",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/recordings`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Meeting Recordings Library",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Meeting Recordings Collection",
      description:
        "Access archived video meeting recordings and replays in your collaboration platform",
      images: [""],
      creator: "@videoconfapp",
    },
  };
}

const Recordings = () => {
  return <p className="text-3xl font-bold text-white">No Recordings Found!</p>;
};

export default Recordings;
