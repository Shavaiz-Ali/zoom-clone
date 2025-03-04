/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
export const useCreateMeeting = () => {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const createMeeting = async (
    meetingTitle: string,
    personal?: boolean,
    passcode?: string,
    roomId?: string
  ) => {
    try {
      setLoader(true);
      const url = personal
        ? `/api/where-by/create-room?personal=${personal}&passcode=${passcode}&roomId=${roomId}`
        : "/api/where-by/create-room";
      const res = await axios.post(url, {
        title: meetingTitle,
      });
      return res.data;
    } catch (error) {
      console.error("Meeting Creation Error:", error);
      setMessage("An error occurred while creating the meeting");
    } finally {
      setLoader(false);
    }
  };

  return { createMeeting, loader, setLoader, message };
};
