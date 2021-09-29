export const formatTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return {
    hours: hours > 12 ? hours - 12 : hours === 0 ? 12 : hours,
    minutes: minutes >= 10 ? minutes : `0${minutes}`,
    seconds,
    ampm: hours >= 12 ? "pm" : "am",
  };
};
