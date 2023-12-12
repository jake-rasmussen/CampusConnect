import { useEffect, useState } from "react";

import { Input } from "./shadcn_ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn_ui/select";

type PropType = {
  value?: Date;
  setValue: (val: Date | ((prevState: Date) => Date)) => void;
  onBlur: () => void;
};

const TimePicker = (props: PropType) => {
  const { value, setValue, onBlur } = props;

  const [date, setDate] = useState(value ? value : undefined);

  const formatHours = (date: Date) => {
    let hour: string = date.getHours().toString();
    if (date.getHours() > 12) {
      if (date.getHours() >= 13 && date.getHours() <= 21) {
        hour = "0" + (date.getHours() - 12).toString();
      } else {
        hour = (date.getHours() - 12).toString();
      }
    }

    if (date.getHours() === 0) {
      hour = "12";
    } else {
      if (date.getHours() < 10) {
        hour = "0" + hour;
      }
    }
    return hour;
  };

  const formatMinutes = (date: Date) => {
    let minute: string = date.getMinutes().toString();
    if (date.getMinutes() === 0) {
      minute = "00";
    } else if (+minute < 10) {
      minute = "0" + minute;
    }
    return minute;
  };

  const [hour, setHour] = useState(date ? formatHours(date) : "");
  const [minute, setMinute] = useState(date ? formatMinutes(date) : "");
  const [meridiem, setMeridiem] = useState(
    date ? (date.getHours() >= 12 ? "PM" : "AM") : "",
  );

  useEffect(() => {
    if (!date && hour !== "" && minute !== "" && meridiem !== "") {
      setDate(new Date());
    }

    if (date) {
      if (hour === "" || minute === "" || meridiem === "" || +hour === 0) {
        setDate(undefined);
        setValue(new Date("Invalid"));
      } else {
        if (meridiem === "PM") {
          if (+hour < 12) {
            date.setHours(+hour + 12);
          } else {
            date.setHours(+hour);
          }
        } else {
          if (+hour === 12) {
            date.setHours(+hour - 12);
          } else {
            date.setHours(+hour);
          }
        }

        date.setMinutes(+minute);
        setValue(date);
      }
    }
  }, [minute, hour, meridiem, date, setValue]);

  return (
    <>
      <div className="flex items-center">
        <div className="grow">
          <input
            className="border-input placeholder:text-muted-foreground h-[3rem] w-[3.3rem]  rounded-xl border px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              const input = e.currentTarget.value;
              if (+input <= 12 && +input >= 0 && input.length <= 2) {
                setHour(input);
              } else {
                if (input[input.length - 1] == "0" && input.length <= 2) {
                  setHour("0" + hour);
                }
              }
            }}
            value={hour}
            onBlur={onBlur}
          />
        </div>
        <h1 className="w-full px-2 text-center text-xl">:</h1>
        <div className="grow">
          <input
            className="border-input placeholder:text-muted-foreground h-[3rem] w-[3.3rem]  rounded-xl border px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              const input = e.currentTarget.value;
              if (+input < 60 && +input >= 0 && input.length <= 2) {
                setMinute(input);
              }
            }}
            value={minute}
            onBlur={onBlur}
          />
        </div>
        <h1 className="w-full px-2 text-center text-xl">:</h1>
        <div className="h-full">
          <Select
            onValueChange={(input) => {
              setMeridiem(input);
            }}
            value={meridiem}
          >
            <SelectTrigger className="h-[3rem] w-[3.75rem] rounded-xl bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default TimePicker;
