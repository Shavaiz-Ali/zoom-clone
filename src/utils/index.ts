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
