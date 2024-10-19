import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Popover } from "react-tiny-popover";
import { getTodo } from "../../../../../redux/actions/todoAction";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getQueryParam } from "../../../../../helpers/getQueryParam";
import { MANAGEMENT_PAGES } from "../../../../../helpers/paths";

const DateModule = ({ isPopoverOpen, onClose, onClick }) => {
  const navigate = useNavigate(); // Navigating hook
  const badge = getQueryParam("priority"); // Getting priority from query parameters
  const dispatch = useDispatch(); // Dispatching hook
  const [dateValue, setDateValue] = useState(new Date());

  // Applying filters and updating the todo list
  const applyFilters = (newValue) => {
    dispatch(getTodo({ badge, duedate: new Date(newValue) })); // Dispatching todo action with filters
    navigate(
      // Navigating with updated parameters
      `${MANAGEMENT_PAGES.MOBILE_APP_PAGE}?priority=${badge}&duedate=${new Date(
        newValue
      )}`
    );
    onClose && onClose(); // Closing modal
  };
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      padding={10}
      onClickOutside={() => onClose && onClose()}
      content={
        <div className="bg-white border p-1 pb-0 rounded-md shadow-lg">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
                applyFilters(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      }
    >
      <div
        onClick={() => onClick && onClick()}
        className="flex items-center gap-2 text-[var(--cmac-management-font-color-1)] border-solid border-[1px] border-[var(--cmac-management-font-color-1)] w-fit p-2 ps-3 pe-3 rounded-md cursor-pointer"
      >
        <CiCalendarDate size={20} />
        <div className="text-md">{moment(dateValue).format("DD-MM-YYYY")}</div>
        <IoIosArrowDown
          className={`${
            isPopoverOpen ? "rotate-180" : "rotate-0"
          } transition ease-in-out`}
        />
      </div>
    </Popover>
  );
};

export default DateModule;
