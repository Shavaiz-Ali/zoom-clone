import mongoose from "mongoose";

const PersonalRoomSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    roomTitle: {
      type: String,
      required: true,
    },
    meetingId: {
      type: String,
      required: true,
    },
    passcode: {
      type: String,
      required: true,
    },
    inviteLink: {
      type: String,
      required: true,
    },
    expiry: {
      type: Boolean,
      default: false,
      required: false,
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

const PersonalRoom =
  mongoose.models.PersonalRoom ||
  mongoose.model("PersonalRoom", PersonalRoomSchema);

export { PersonalRoom };
