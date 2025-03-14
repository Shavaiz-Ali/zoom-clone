"use server";

import { PersonalRoom } from "@/schemas/personal-room";
import { jwtDecode } from "jwt-decode";

interface decodedData {
  meetingId: string;
  roomId: string;
  exp: number;
  iat: number;
}

export const verifyToken = async (
  token: string,
  roomId: string | undefined
) => {
  if (!token) {
    return JSON.stringify({
      success: false,
      message: "Token is missing",
      status: 400,
    });
  }

  try {
    const decoded: decodedData = jwtDecode(token);

    if (decoded && decoded.exp) {
      const expiryTimeInSeconds = decoded.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds

      if (expiryTimeInSeconds < currentTimeInSeconds) {
        await PersonalRoom.findByIdAndUpdate(
          { _id: roomId },
          { expiry: true },
          { new: true }
        );
        return JSON.stringify({
          success: false,
          message: "Token has expired",
          status: 401,
        });
      }
    }

    return JSON.stringify({ success: true, decoded, status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return JSON.stringify({
      success: false,
      message: "Invalid token",
      status: 401,
    });
  }
};
