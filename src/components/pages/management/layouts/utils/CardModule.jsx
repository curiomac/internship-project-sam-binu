import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import message_ic from "../../../../../assets/icons/msg_ic.png";
import file_ic from "../../../../../assets/icons/file_ic.png";
import moment from "moment";

const CardModule = ({ badge, title, duedate, createdAt, description }) => {
  const getBadgeTheme = () => {
    // Badge theme based on the priority level
    switch (badge) {
      case "high": {
        return {
          bg: "rgba(216, 114, 125, 0.1)", // Background color for high priority
          color: "rgba(216, 114, 125, 1)", // Text color for high priority
        };
      }
      case "medium": {
        return {
          bg: "rgba(223, 168, 116, 0.2)", // Background color for medium priority
          color: "rgba(213, 141, 73, 1)", // Text color for medium priority
        };
      }
      case "low": {
        return {
          bg: "rgba(131, 194, 157, 0.2)", // Background color for low priority
          color: "rgba(104, 178, 102, 1)", // Text color for low priority
        };
      }
      default: {
        return {
          bg: "#ffffff", // Default background color
          color: "#000", // Default text color
        };
      }
    }
  };
  return (
    <div className="p-4 w-full shadow-none bg-[var(--cmac-management-bg-1)] rounded-2xl">
      <div className="flex items-center justify-between">
        <div
          className="w-fit p-2 rounded-md text-xs pt-1 pb-1 capitalize"
          style={{
            background: getBadgeTheme().bg,
            color: getBadgeTheme().color,
          }}
        >
          {badge}
        </div>
        <HiOutlineDotsHorizontal />
      </div>
      <div className="text-lg font-bold mt-2 text-[var(--cmac-management-font-color-2)]">
        {title}
      </div>
      <div className="text-xs mt-1 text-[var(--cmac-management-font-color-1)]">
        {description}
      </div>
      <div className="text-xs font-bold flex items-center gap-2 mt-2">
        <div>Due Date:</div>
        <div>{moment(duedate).format("DD MMM YYYY")}</div>
      </div>
      <div className="flex items-center justify-between mt-6 text-[var(--cmac-management-font-color-1)]">
        <div className="text-[10px]">
          {moment(createdAt).format("DD MMM YYYY hh:mm A")}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={message_ic} alt="message_ic" height={16} width={16} />
            <div className="text-xs">0 Comments</div>
          </div>
          <div className="flex items-center gap-2">
            <img src={file_ic} alt="file_ic" />
            <div className="text-xs">0 Files</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModule;
