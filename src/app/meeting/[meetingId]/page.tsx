import WherebyMeeting from "@/components/shared/meeting";
import React from "react";

const Meeting = async ({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) => {
  const { meetingId } = await params;
  console.log(meetingId);
  return (
    <div className="w-full">
      <WherebyMeeting meetingId={meetingId} />
    </div>
  );
};

export default Meeting;
