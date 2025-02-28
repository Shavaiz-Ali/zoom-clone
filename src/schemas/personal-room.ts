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
  },
  { timestamps: true }
);

const PersonalRoom =
  mongoose.models.PersonalRoom ||
  mongoose.model("PersonalRoom", PersonalRoomSchema);

export { PersonalRoom };
