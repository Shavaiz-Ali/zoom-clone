"use server";

import { connectToDatabase } from "@/lib/db";
import { PreviousMeeting } from "@/schemas/previous-meetings";
import { currentUser } from "@clerk/nextjs/server";

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
    });

    return JSON.stringify({ success: true, data: previousMeetings });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      error: "An error occurred",
      status: 500,
    });
  }
};
