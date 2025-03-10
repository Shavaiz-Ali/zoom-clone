import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorize access!" },
        { status: 401 }
      );
    }
    const { id } = user;
    const { title, password, roomId } = body;

    if ((!title && !password) || !roomId) {
      return NextResponse.json(
        { success: false, message: "All fields were required!" },
        { status: 400 }
      );
    }

    const checkRommExists = await PersonalRoom.findById({ _id: roomId });
    if (!checkRommExists) {
      return NextResponse.json(
        { success: false, message: "No such room found to update!" },
        { status: 404 }
      );
    }

    const updateRoom = await PersonalRoom.findByIdAndUpdate(
      { _id: roomId, userId: id },
      {
        roomTitle: title,
        passcode: password,
      },
      { new: true }
    );

    if (!updateRoom) {
      return NextResponse.json(
        { success: false, message: "Unable to update room!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Room updated succesfully!", updateRoom },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
