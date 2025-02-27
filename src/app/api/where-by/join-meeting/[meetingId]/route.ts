/* eslint-disable @typescript-eslint/no-unused-vars */
import { PreviousMeeting } from "@/schemas/previous-meetings";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { meetingId: string } }
) {
  try {
    const user = (await currentUser()) as User | null;
    const { meetingId } = await params;
    const currentTime = new Date();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress;

    const userDetails = {
      id,
      email,
      firstName,
      lastName,
      imageUrl,
    };

    const UpdateMeetingByRoomName = await PreviousMeeting.findOne({
      roomName: `/${meetingId}`,
    });

    if (!UpdateMeetingByRoomName) {
      return NextResponse.json(
        { success: false, message: "Meeting not found" },
        { status: 404 }
      );
    }

    const meetingEndDate = new Date(UpdateMeetingByRoomName.endDate);
    const now = new Date(currentTime);

    if (meetingEndDate < now) {
      return NextResponse.json(
        { success: false, message: "Meeting has ended" },
        { status: 400 }
      );
    }

    if (
      UpdateMeetingByRoomName.participants.find(
        (participant: User) => participant.id === id
      )
    ) {
      return NextResponse.json(
        { success: false, message: "User already joined the meeting" },
        { status: 400 }
      );
    }

    // ✅ Use $push to append the new user to participants
    const UpdateMeetingDetailsByRoomName =
      await PreviousMeeting.findOneAndUpdate(
        { roomName: `/${meetingId}` },
        { $push: { participants: userDetails } }, // ✅ Fix: Append instead of replace
        { new: true } // ✅ Returns updated document
      );

    if (!UpdateMeetingDetailsByRoomName) {
      return NextResponse.json(
        { success: false, message: "Unable to Join" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User joined the meeting successfully",
        data: UpdateMeetingDetailsByRoomName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Meeting Update Error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the meeting" },
      { status: 500 }
    );
  }
}
