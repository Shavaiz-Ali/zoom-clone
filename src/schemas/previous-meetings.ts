import mongoose from "mongoose";

const PreviousMeetingsSchema = new mongoose.Schema(
  {
    meetingId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    meetingTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    roomUrl: {
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
  },
  { timestamps: true }
);

const PreviousMeeting =
  mongoose.models.PreviousMeeting ||
  mongoose.model("PreviousMeeting", PreviousMeetingsSchema);
export { PreviousMeeting };
