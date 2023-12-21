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
  str = str.toLocaleLowerCase();
  str = str[0]?.toLocaleUpperCase() + str.slice(1);
  return str;
};

export const convertStreamToFile = async (
  stream: ReadableStream<Uint8Array>,
  fileName: string,
) => {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }

  const concatenatedArray = new Uint8Array(
    chunks.reduce((totalLength, chunk) => totalLength + chunk.length, 0),
  );
  let offset = 0;

  for (const chunk of chunks) {
    concatenatedArray.set(chunk, offset);
    offset += chunk.length;
  }

  const blob = new Blob([concatenatedArray], { type: "text/plain" });
  const file = new File([blob], fileName, { type: "text/plain" });

  return file;
};
