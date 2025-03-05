"use server";

import { connectToDatabase } from "@/lib/db";
import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";

export const VerifyPersonalRooms = async (meetingId: string) => {
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
    const personalRoom = await PersonalRoom.find({
      userId,
      meetingId,
    });

    if (!personalRoom) {
      return JSON.stringify({
        success: false,
        message: "No personal room found!",
        status: 404,
      });
    }

    return JSON.stringify({ success: true, message: "Verified", status: 200 });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      message: "Something went wrong!",
      status: 500,
    });
  }
};
