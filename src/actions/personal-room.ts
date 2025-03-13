"use server";

import { connectToDatabase } from "@/lib/db";
import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const getPersonalRooms = async () => {
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
    }).sort({ createdAt: -1 });

    if (!personalRoom || personalRoom?.length < 1) {
      return NextResponse.json(
        { success: false, message: "No personal rooms created yet!" },
        { status: 404 }
      );
    }

    return JSON.stringify({ success: true, data: personalRoom, status: 200 });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      error: "An error occurred",
      status: 500,
    });
  }
};
