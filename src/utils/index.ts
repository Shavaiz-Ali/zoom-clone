export const getCurrentTime = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date().toLocaleTimeString("en-US", options);
};

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date().toLocaleDateString("en-GB", options);
};

export const formatDate = (selectedDate: string) => {
  if (selectedDate) {
    const date = new Date(selectedDate);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return null;
};

export const formatTime = (selectedTime: string) => {
  if (selectedTime) {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return null;
};
