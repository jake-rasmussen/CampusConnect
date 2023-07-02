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
  date: Date | undefined;
  setValue: (val: Date | ((prevState: Date) => Date)) => void;
  onBlur: () => void;
};

const TimePicker = (props: PropType) => {
  const { setValue, onBlur } = props;
  let { date } = props;

  const [hour, setHour] = useState(
    date !== undefined ? date.getHours().toString() : "",
  );
  const [minute, setMinute] = useState(
    date !== undefined ? date.getMinutes().toString() : "",
  );
  const [meridiem, setMeridiem] = useState(
    date !== undefined ? (date.getHours() >= 12 ? "PM" : "AM") : "",
  );

  useEffect(() => {
    if (date !== undefined) {
      if (date.getHours() > 12) {
        if (date.getHours() >= 13 && date.getHours() <= 21) {
          setHour("0" + (date.getHours() - 12).toString());
        } else {
          setHour((date.getHours() - 12).toString());
        }
      }

      if (date.getHours() === 0) {
        setHour("12");
      } else {
        if (+hour < 10) {
          setHour("0" + hour);
        }
      }

      if (date.getMinutes() === 0) {
        setMinute("00");
      }

      if (date.getHours() >= 12) {
        setMeridiem("PM");
      } else {
        setMeridiem("AM");
      }

      if (+minute < 10) {
        setMinute("0" + minute);
      }
    }
  }, []);

  useEffect(() => {
    if (date !== undefined) {
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
  }, [minute, hour, meridiem]);

  return (
    <>
      <div className="flex w-full items-center">
        <div className="grow">
          <Input
            className="h-[3rem]"
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
            onFocus={() => {
              if (date === undefined) {
                date = new Date();
              }
            }}
          />
        </div>
        <h1 className="px-2 text-xl">:</h1>
        <div className="grow">
          <Input
            className="h-[3rem]"
            onChange={(e) => {
              const input = e.currentTarget.value;
              if (+input <= 60 && +input >= 0 && input.length <= 2) {
                setMinute(input);
              }
            }}
            value={minute}
            onBlur={onBlur}
            onFocus={() => {
              if (date === undefined) {
                date = new Date();
              }
            }}
          />
        </div>
        <h1 className="px-2 text-xl">:</h1>
        <div className="w-18 h-full">
          <Select
            onValueChange={(input) => {
              setMeridiem(input);
            }}
            value={meridiem}
            onOpenChange={() => {
              if (date === undefined) {
                date = new Date();
              }
            }}
          >
            <SelectTrigger className="h-full w-18 w-full rounded-xl bg-white">
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
