import React from "react";
import { CiSearch } from "react-icons/ci";
import calender_ic from "../../../assets/icons/calendar_ic.png";
import query_ic from "../../../assets/icons/query_ic.png";
import bell_ic from "../../../assets/icons/bell_ic.png";
import { IoIosArrowDown } from "react-icons/io";

const Topbar = () => {
  const user = {
    userName: "Palak Jain",
    city: "Rajasthan, India",
    avatar:
      "https://img.freepik.com/premium-photo/woman-with-blue-white-striped-shirt-is-posing-photo_403587-2028.jpg?uid=R155490646&ga=GA1.1.512068865.1729177272&semt=ais_hybrid",
  };
  return (
    <div className="topbar_container">
      <div className="search_tab">
        <div className="search_ic_container">
          <CiSearch />
        </div>
        <input type="text" placeholder="Search for anything..." />
      </div>
      <div className="end_links gap-16">
        <div className="flex items-center gap-5">
          <div className="button">
            <img src={calender_ic} alt="calender_ic" />
          </div>
          <div className="button">
            <img src={query_ic} alt="query_ic" />
          </div>
          <div className="button">
            <img src={bell_ic} alt="bell_ic" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className=" flex flex-col text-end text-sm">
            <div className="text-[var(--cmac-management-font-color-2)]">
              {user.userName}
            </div>
            <div className="text-[var(--cmac-management-font-color-1)]">
              {user.city}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full overflow-hidden">
              <img src={user.avatar} alt="avatar" height={35} width={35} />
            </div>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
