const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateToStringFormatted = (date: Date) => {
  return `${month[date.getMonth()] as string} ${date.getDate()}`
};

export const dateToTimeStringFormatted = (date: Date) => {
  let str = "";

  str += date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  str += ":";

  if (date.getMinutes() < 10) str += "0";
  str += date.getMinutes();
  str += date.getHours() >= 12 ? " PM" : " AM";

  return str;
};

export const dateAndTimeToStringFormatted = (date: Date) => {
  return `${dateToStringFormatted(date)} at ${dateToTimeStringFormatted(date)}`;
};
