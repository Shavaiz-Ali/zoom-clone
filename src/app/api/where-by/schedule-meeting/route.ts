import { connectToDatabase } from "@/lib/db";
import ScheduleRoom from "@/schemas/schedule-room";
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
    console.log(body);
    const { description, startDate, startTime } = body;

    if ([description, startDate, startTime].some((val) => val === "")) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newSchedule = await ScheduleRoom.create({
      description,
      startDate,
      startTime,
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
      { success: true, message: "Room scheduled successfully!" },
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
