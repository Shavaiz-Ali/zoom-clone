interface RequestBody {
  isLocked: boolean;
  roomMode: string;
  endDate: string;
}

export const createRoomViaWhereBy = async () => {
  const apiKey = process.env.WHEREBY_API_KEY;
  if (!apiKey) {
    return JSON.stringify({ error: "API Key is missing", status: 500 });
  }

  const requestBody: RequestBody = {
    isLocked: false,
    roomMode: "group",
    endDate: new Date(Date.now() + 3600 * 1000).toISOString(),
  };

  try {
    const response = await fetch("https://api.whereby.dev/v1/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "An error occurred", status: 500 });
  }
};
