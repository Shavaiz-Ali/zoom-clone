/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";
import { createRoomViaWhereBy } from "@/utils/where-by";

const JWT_SECRET = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pathToRevalidate, roomTitle, passcode, inviteLink } = body;

    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access!" },
        { status: 400 }
      );
    }

    // Validation
    if ([roomTitle, passcode, inviteLink].some((a: any) => a === "" || !a)) {
      return NextResponse.json(
        { success: false, message: "Some fields are missing!" },
        { status: 400 }
      );
    }

    // const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    // const email = emailAddresses[0]?.emailAddress;

    // const userDetails = { id, email, firstName, lastName, imageUrl };

    const response = await createRoomViaWhereBy();

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
    // Generate JWT token for authentication instead of exposing passcode
    const token = jwt.sign({ meetingId: data.meetingId }, JWT_SECRET, {
      expiresIn: "30s",
    });

    const updatedInviteLink = `${inviteLink}${data.roomName}?token=${token}`;

    const pRoom = await PersonalRoom.create({
      ...body,
      meetingId: data?.meetingId,
      passcode, // Store in DB but not expose it in URL
      inviteLink: updatedInviteLink,
      userId: userId,
      // participants: [userDetails],
    });

    if (!pRoom) {
      return NextResponse.json(
        { success: false, message: "Unable to create room" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Personal room created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
