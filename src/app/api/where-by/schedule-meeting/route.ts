import { connectToDatabase } from "@/lib/db";
import ScheduleRoom from "@/schemas/schedule-room";
import { createRoomViaWhereBy } from "@/utils/where-by";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorize access!" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const email = emailAddresses[0]?.emailAddress;

    const userDetails = { id, email, firstName, lastName, imageUrl };
    console.log(body);
    const { description, startDate, startTime, inviteLink } = body;

    if (
      [description, startDate, startTime, inviteLink].some((val) => val === "")
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

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

    const updatedInviteLink = `${body.inviteLink}${data.roomName}`;

    await connectToDatabase();

    const newSchedule = await ScheduleRoom.create({
      description,
      startDate,
      startTime,
      participants: [userDetails],
      inviteLink: updatedInviteLink,
      userId: user.id,
    });

    await newSchedule.save();

    if (!newSchedule) {
      return NextResponse.json(
        { success: false, message: "Something went wrong!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Room scheduled successfully!",
        inviteLink: newSchedule.inviteLink,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error!" },
      { status: 500 }
    );
  }
}
