import { connectToDatabase } from "@/lib/db";
import { PersonalRoom } from "@/schemas/personal-room";
import { PreviousMeeting } from "@/schemas/previous-meetings";
import { createRoomViaWhereBy } from "@/utils/where-by";
import { currentUser } from "@clerk/nextjs/server";
// import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName: string;
  lastName: string;
  imageUrl: string;
}

// interface RequestBody {
//   isLocked: boolean;
//   roomMode: string;
//   endDate: string;
// }

const checkPassword = async (
  passcode: string | null,
  roomId: string | null
) => {
  if (!passcode || !roomId) {
    return NextResponse.json(
      { success: false, message: "Passcode and Room ID are required" },
      { status: 400 }
    );
  }

  const room = await PersonalRoom.findById({ _id: roomId });
  console.log(room);
  if (!room) {
    return NextResponse.json(
      { success: false, message: "Room not found" },
      { status: 400 }
    );
  }

  console.log(passcode === room.passcode);

  // const correctPassword = await bcrypt.compare(passcode, room.passcode);
  // console.log(correctPassword);
  if (passcode !== room.passcode) {
    return NextResponse.json(
      { success: false, message: "Password incorrect" },
      { status: 400 }
    );
  }

  return true;
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const personal = req.nextUrl.searchParams.get("personal");
    const passcode = req.nextUrl.searchParams.get("passcode");
    const roomId = req.nextUrl.searchParams.get("roomId");
    const { title } = body;

    if (personal) {
      const isValid = await checkPassword(passcode, roomId);
      if (isValid !== true) return isValid;
    }

    const apiKey = process.env.WHEREBY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key is missing" },
        { status: 500 }
      );
    }

    const user = (await currentUser()) as User | null;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress;

    const userDetails = { id, email, firstName, lastName, imageUrl };

    // const requestBody: RequestBody = {
    //   isLocked: false,
    //   roomMode: "group",
    //   endDate: new Date(Date.now() + 3600 * 1000).toISOString(),
    // };

    // const response = await fetch("https://api.whereby.dev/v1/meetings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    const response = await createRoomViaWhereBy();

    // Check if response is a string and handle it
    if (typeof response === "string") {
      return NextResponse.json(
        { error: response || "Unknown API error" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Unknown API error" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const meetingData = {
      meetingId: data.meetingId,
      roomName: data.roomName,
      meetingTitle: title,
      roomUrl: data.roomUrl,
      ownerId: id,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: [userDetails],
    };

    const createMeeting = new PreviousMeeting(meetingData);
    await createMeeting.save();

    return NextResponse.json({ data, status: 201 });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
