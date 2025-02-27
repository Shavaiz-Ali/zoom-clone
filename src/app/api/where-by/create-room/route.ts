/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/lib/db";
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

interface RequestBody {
  isLocked: boolean;
  roomMode: string;
  endDate: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

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

    const userDetails = {
      id,
      email,
      firstName,
      lastName,
      imageUrl,
    };

    const requestBody: RequestBody = {
      isLocked: false,
      roomMode: "group",
      endDate: new Date(Date.now() + 3600 * 1000).toISOString(),
    };

    const response = await fetch("https://api.whereby.dev/v1/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message },
        { status: response.status }
      );
    }

    const data = await response.json();

    await connectToDatabase();

    // ✅ Ensure `participants` is an **array of objects**
    const meetingData = {
      meetingId: data.meetingId,
      roomName: data.roomName,
      meetingTitle: title,
      roomUrl: data.roomUrl,
      ownerId: id,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: [userDetails], // ✅ Correctly passing as an array of objects
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
