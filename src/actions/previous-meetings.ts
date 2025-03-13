"use server";

import { connectToDatabase } from "@/lib/db";
import { PreviousMeeting } from "@/schemas/previous-meetings";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const getPreviousMeetings = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return JSON.stringify({
        success: false,
        error: "Unauthorized access",
        status: 401,
      });
    }

    const userId = user.id;

    await connectToDatabase();
    const previousMeetings = await PreviousMeeting.find({
      $or: [
        { hostId: userId }, // Check if user is the host
        { "participants.id": user.id }, // Check if user is a participant
      ],
    }).sort({ createdAt: -1 });

    if (!previousMeetings || previousMeetings?.length < 1) {
      return NextResponse.json(
        { success: false, message: "No personal rooms created yet!" },
        { status: 404 }
      );
    }

    return JSON.stringify({
      success: true,
      data: previousMeetings,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      error: "An error occurred",
      status: 500,
    });
  }
};
