/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
export const useCreateMeeting = () => {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const createMeeting = async (meetingTitle: string) => {
    try {
      setLoader(true);
      const res = await axios.post("/api/where-by/create-room", {
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
