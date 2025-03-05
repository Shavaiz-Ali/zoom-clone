import { VerifyPersonalRooms } from "@/actions/verify-personal-room";
import WherebyMeeting from "@/components/shared/meeting";
import React from "react";

const Meeting = async ({
  params,
  searchParams,
}: {
  params: Promise<{ meetingId: string }>;
  searchParams: Promise<{ token: string }>;
}) => {
  const { token } = await searchParams;
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
