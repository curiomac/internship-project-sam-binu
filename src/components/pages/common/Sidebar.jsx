import React from "react";
import { MANAGEMENT_PAGES } from "../../../helpers/paths";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
import arrow from "../../../assets/icons/arrow.png";
import dash_ic from "../../../assets/icons/dash_ic.png";
import msg_ic from "../../../assets/icons/msg_ic.png";
import task_ic from "../../../assets/icons/task_ic.png";
import member_ic from "../../../assets/icons/member_ic.png";
import settings_ic from "../../../assets/icons/settings_ic.png";
import light_ic from "../../../assets/icons/light_ic.png";
import { HiOutlineDotsHorizontal, HiOutlinePlusSm } from "react-icons/hi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const links = [
    {
      id: 1,
      linkName: "Home",
      link: MANAGEMENT_PAGES.HOME_PAGE,
      ic: () => <img src={dash_ic} alt="dash_ic" className="ic" />,
    },
    {
      id: 2,
      linkName: "Messages",
      link: MANAGEMENT_PAGES.MESSAGES_PAGE,
      ic: () => <img src={msg_ic} alt="msg_ic" className="ic" />,
    },
    {
      id: 3,
      linkName: "Tasks",
      link: MANAGEMENT_PAGES.TASKS_PAGE,
      ic: () => <img src={task_ic} alt="task_ic" className="ic" />,
    },
    {
      id: 4,
      linkName: "Members",
      link: MANAGEMENT_PAGES.MEMBERS_PAGE,
      ic: () => <img src={member_ic} alt="member_ic" className="ic" />,
    },
    {
      id: 5,
      linkName: "Settings",
      link: MANAGEMENT_PAGES.SETINGS_PAGE,
      ic: () => <img src={settings_ic} alt="settings_ic" className="ic" />,
    },
  ];
  const projectLinks = [
    {
      id: 1,
      linkName: "Mobile App",
      link: MANAGEMENT_PAGES.MOBILE_APP_PAGE,
      color: "#7AC555",
    },
    {
      id: 2,
      linkName: "Website Redesign",
      link: MANAGEMENT_PAGES.WEBSITE_REDESIGN_PAGE,
      color: "#FFA500",
    },
    {
      id: 3,
      linkName: "Design System",
      link: MANAGEMENT_PAGES.DESIGN_PAGE,
      color: "#E4CCFD",
    },
    {
      id: 4,
      linkName: "Wireframes",
      link: MANAGEMENT_PAGES.WIREFRAME_PAGE,
      color: "#76A5EA",
    },
  ];
  return (
    <div className="sidebar_container">
      <div className="container_top">
        <div className="logo_container">
          <img src={logo} alt="logo" />
          <div>Project M.</div>
        </div>
        <img src={arrow} alt="arrow" />
      </div>
      <div className="links_container">
        {links.map((data) => {
          return (
            <Link to={data.link} key={data.id}>
              {data?.ic()} {data.linkName}
            </Link>
          );
        })}
      </div>
      <div className="project_links_container">
        <div className="header">
          <div>My Projects</div>
          <div className="add_ic_container">
            <HiOutlinePlusSm />
          </div>
        </div>
        <div className="data_links_container">
          {projectLinks.map((data) => {
            return (
              <Link
                key={data?.id}
                to={data.link}
                className={`${
                  pathname === MANAGEMENT_PAGES.MOBILE_APP_PAGE &&
                  data.link === MANAGEMENT_PAGES.MOBILE_APP_PAGE &&
                  "active"
                }`}
              >
                <div className="link_focus_element">
                  <div
                    className="span_color"
                    style={{
                      background: data?.color,
                    }}
                  ></div>
                  <div className="_link">{data.linkName}</div>
                </div>
                <HiOutlineDotsHorizontal />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="banner bg-[var(--cmac-management-bg-2)] p-5 m-4 rounded-2xl flex flex-col gap-5 items-center text-center">
        <div className="asset_container rounded-full">
          <div className="asset_item">
            <img src={light_ic} alt="light_ic" />
          </div>
        </div>
        <div className="text-sm font-bold mt-4">Thoughts Time</div>
        <div className="text-xs">
          We don’t have any notice for you, till then you can share your
          thoughts with your peers.
        </div>
        <button className="text-sm font-bold bg-[var(--cmac-management-bg-1)] p-3 w-full rounded-md">
          Write a message
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
