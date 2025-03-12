/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

interface DateTimePickerProps {
  selectedDateTime: {
    description: string;
    startTime: string;
    startDate: string;
  };
  setSelectedDateTime: Dispatch<
    SetStateAction<{
      description: string;
      startTime: string;
      startDate: string;
    }>
  >;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDateTime,
  setSelectedDateTime,
}) => {
  const [show, setShow] = useState<boolean>(false);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [selectedTime, setSelectedTime] = useState<string>("");

  const options: IOptions = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    inputDateFormatProp: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    theme: {
      background:
        "bg-dark-2 border border-gray-600 shadow-xl rounded-lg  p-4 mt-3  w-80", // Improved dropdown styling
      todayBtn:
        "bg-blue-500 text-white hover:bg-blue-600 font-medium py-2 px-4 rounded-md w-full",
      clearBtn:
        "bg-red-500 text-white hover:bg-red-600 font-medium py-2 px-4 rounded-md",
      icons: "text-gray-400",

      text: "text-gray-100",
      disabledText: "text-gray-600",
      input:
        "w-full bg-dark-3 text-gray-100 border-none rounded-[4px] py-[10px] px-3 focus:outline-none",
      inputIcon: "text-gray-400 hover:text-blue-300",
      selected: "bg-blue-400 text-white font-semibold",
      // grid: "grid grid-cols-7 gap-2",
    },
  };

  // const handleDateChange = (date: string) => {
  //   setSelectedDateTime({
  //     ...selectedDateTime,
  //     startDate: date,
  //   });
  // };

  // const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedTime(event.target.value);
  // };

  return (
    <form className="relative flex-1 flex justify-center items-center gap-x-2">
      <DatePicker
        show={show}
        setShow={(state) => setShow(state)}
        options={options}
        classNames="z-50 w-full left-0" // Adjusted width & alignment
        onChange={(date: Date) =>
          setSelectedDateTime({
            ...selectedDateTime,
            startDate: date.toISOString(),
          })
        }
      />
      <div className="relative">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="time"
          id="time"
          className="bg-dark-3 border-none
           leading-none text-white text-sm  rounded-[4px] py-[10px] px-3 "
          min="09:00"
          max="18:00"
          placeholder="select time"
          required
          value={selectedDateTime.startTime}
          onChange={(e) =>
            setSelectedDateTime({
              ...selectedDateTime,
              startTime: e.target.value,
            })
          }
        />
      </div>
    </form>
  );
};

export default DateTimePicker;
