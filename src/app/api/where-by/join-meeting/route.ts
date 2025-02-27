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

export async function POST(req: NextRequest) {
  try {
    const user = (await currentUser()) as User | null;
    const url = new URL(req.nextUrl.href);
    const meetingId = url.searchParams.get("meetingId");

    if (!user || !meetingId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress;
    const userDetails = { id, email, firstName, lastName, imageUrl };

    // ✅ Check if the user is already in the meeting using $elemMatch
    const isUserAlreadyJoined = await PreviousMeeting.findOne({
      roomName: `/${meetingId}`,
      participants: { $elemMatch: { id } },
    });

    if (isUserAlreadyJoined) {
      return NextResponse.json(
        { success: false, message: "User already joined the meeting" },
        { status: 400 }
      );
    }

    // ✅ Update meeting and return the updated document in a single query
    const UpdateMeetingDetailsByRoomName =
      await PreviousMeeting.findOneAndUpdate(
        { roomName: `/${meetingId}` },
        { $push: { participants: userDetails } },
        { new: true, maxTimeMS: 3000 } // ✅ Prevents long execution times
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
