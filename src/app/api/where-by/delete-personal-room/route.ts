import { PersonalRoom } from "@/schemas/personal-room";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    const body = await req.json();
    console.log(body);

    const { roomId, path } = body;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorize access!" },
        { status: 400 }
      );
    }

    if (!roomId || !path) {
      return NextResponse.json(
        { success: false, message: "id is missing!" },
        { status: 400 }
      );
    }

    const fileExists = await PersonalRoom.find({ _id: roomId });

    if (!fileExists) {
      return NextResponse.json(
        { success: false, message: "room does not exist!" },
        { status: 400 }
      );
    }

    const delFile = await PersonalRoom.findByIdAndDelete(roomId);

    if (!delFile) {
      return NextResponse.json(
        { success: false, message: "Unable to delete file!" },
        { status: 400 }
      );
    }

    revalidatePath(path);

    return NextResponse.json(
      { success: true, message: "Room deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error!" },
      { status: 500 }
    );
  }
}
