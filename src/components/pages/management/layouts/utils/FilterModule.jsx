import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Popover } from "react-tiny-popover";
import { getTodo } from "../../../../../redux/actions/todoAction";
import { getQueryParam } from "../../../../../helpers/getQueryParam";
import { useNavigate } from "react-router-dom";
import { MANAGEMENT_PAGES } from "../../../../../helpers/paths";

const FilterModule = ({ isPopoverOpen, onClose, onClick }) => {
  const navigate = useNavigate(); // Navigating hook
  const dispatch = useDispatch(); // Dispatching hook
  const duedate = getQueryParam("duedate"); // Getting due date from query parameters
  const [badge, setBadge] = useState("all");

  // Applying filters and updating the todo list
  const applyFilters = () => {
    dispatch(
      getTodo({
        badge, // Using current badge filter
        duedate:
          duedate === "null" || duedate === null
            ? new Date()
            : new Date(duedate),
      })
    );

    navigate(
      // Navigating with updated parameters
      `${MANAGEMENT_PAGES.MOBILE_APP_PAGE}?priority=${badge}&duedate=${duedate}`
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
        <div className="bg-white border p-4 rounded-md shadow-lg w-64">
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2">Priority</label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="border rounded-md p-2 w-full outline-none text-sm"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-[var(--cmac-management-bg-4)] text-white px-3 py-1 rounded-sm text-sm h-9"
              onClick={applyFilters}
            >
              Apply Filter
            </button>
          </div>
        </div>
      }
    >
      <div
        className="flex items-center gap-2 text-[var(--cmac-management-font-color-1)] border-solid border-[1px] border-[var(--cmac-management-font-color-1)] w-fit p-2 ps-3 pe-3 rounded-md cursor-pointer"
        onClick={() => onClick && onClick()}
      >
        <LuFilter />
        <div>Filter</div>
        <IoIosArrowDown
          className={`${
            isPopoverOpen ? "rotate-180" : "rotate-0"
          } transition ease-in-out`}
        />
      </div>
    </Popover>
  );
};

export default FilterModule;
