import mongoose from "mongoose";

const ScheduleRoomSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: [
      {
        id: { type: String, required: true },
        email: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        imageUrl: { type: String },
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScheduleRoom =
  mongoose.models.ScheduleRoom ||
  mongoose.model("ScheduleRoom", ScheduleRoomSchema);

export default ScheduleRoom;
