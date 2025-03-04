/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pathToRevalidate, roomTitle, meetingId, passcode, inviteLink } =
      body;

    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access!" },
        { status: 400 }
      );
    }

    // validation
    if (
      [roomTitle, meetingId, passcode, inviteLink].some(
        (a: any) => a === "" || !a
      )
    ) {
      return NextResponse.json(
        { success: false, message: "some fields are missing!" },
        { status: 400 }
      );
    }

    // hashing password
    // const salt = 10;
    // const hashPassword = await bcrypt.hash(passcode, salt);

    // if (!hashPassword) {
    //   return NextResponse.json(
    //     { success: false, message: "Unable to hash password" },
    //     { status: 400 }
    //   );
    // }

    // updating invite link and creating room
    const updatedInviteLink = `${inviteLink}?pwd=${passcode}`;

    const pRoom = await PersonalRoom.create({
      ...body,
      passcode,
      inviteLink: updatedInviteLink,
      userId: userId,
    });

    if (!pRoom) {
      return NextResponse.json(
        { success: false, message: "Unable to create room" },
        { status: 400 }
      );
    }

    console.log(pathToRevalidate);

    revalidatePath(pathToRevalidate);
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
