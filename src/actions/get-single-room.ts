"use server";

import { connectToDatabase } from "@/lib/db";
import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";

export const getPersonalRoom = async (meetingId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return JSON.stringify({
        success: false,
        error: "Unauthorized access",
        status: 401,
      });
    }

    console.log(meetingId);
    await connectToDatabase();
    const personalRoom = await PersonalRoom.findOne({ meetingId: meetingId });

    if (!personalRoom) {
      return JSON.stringify({
        success: false,
        message: "No personal room found!",
        status: 404,
      });
    }

    return JSON.stringify({
      success: true,
      message: "Verified",
      passcode: personalRoom.passcode,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      message: "Something went wrong!",
      status: 500,
    });
  }
};
