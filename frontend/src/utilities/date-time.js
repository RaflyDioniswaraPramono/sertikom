export const date = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};

export const time = (date) => {
  return new Date(date).toLocaleTimeString("id-ID", {
    timeStyle: "short",
  });
};