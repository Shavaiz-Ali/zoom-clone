import WherebyMeeting from "@/components/shared/meeting";
import React from "react";

const Meeting = async ({
  params,
  searchParams,
}: {
  params: Promise<{ meetingId: string }>;
  searchParams: Promise<{ personal: boolean }>;
}) => {
  const { personal } = await searchParams;
  console.log(personal);
  const { meetingId } = await params;
  console.log(meetingId);
  return (
    <div className="w-full">
      <WherebyMeeting meetingId={meetingId} personal={personal} />
    </div>
  );
};

export default Meeting;
