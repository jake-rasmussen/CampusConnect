import lodash from "lodash";

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
  return `${month[date.getMonth()] as string} ${date.getDate()}`;
};

export const dateToTimeStringFormatted = (date: Date) => {
  let str = "";

  if (date.getHours() !== 0) {
    str += date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  } else {
    str += "12";
  }

  str += ":";

  if (date.getMinutes() < 10) str += "0";
  str += date.getMinutes();
  str += date.getHours() >= 12 ? " PM" : " AM";

  return str;
};

export const dateAndTimeToStringFormatted = (date: Date) => {
  return `${dateToStringFormatted(date)} at ${dateToTimeStringFormatted(date)}`;
};

export const randomNumberBetweenInclusive = (min: number, max: number) => {
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const applicationMemberTypeToString = (type: string) => {
  const arr = type.toLowerCase().split("_");
  let str = "";

  arr.forEach((word) => {
    str = str + lodash.upperFirst(word) + " ";
  });

  return str;
};

export const uppercaseToCapitalize = (str: string) => {
  return str
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};