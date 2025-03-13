import { connectToDatabase } from "@/lib/db";
import ScheduleRoom from "@/schemas/schedule-room";
import { currentUser } from "@clerk/nextjs/server";

export const getUpcomingMeetings = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        message: "Unauthorized access!",
        status: 401,
      };
    }

    await connectToDatabase();

    const upcomingMeetings = await ScheduleRoom.find({ userId: user.id }).sort({
      createdAt: -1,
    });
    if (!upcomingMeetings || upcomingMeetings?.length < 1) {
      return {
        success: false,
        message: "No meetings scheduled yet!",
        status: 404,
      };
    }

    return {
      success: true,
      message: "Upcoming meetings fetched successfully!",
      data: JSON.stringify(upcomingMeetings),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
