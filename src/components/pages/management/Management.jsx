import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MANAGEMENT_PAGES } from "../../../helpers/paths";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

const Management = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(MANAGEMENT_PAGES.MOBILE_APP_PAGE);
  }, [navigate]);
  return (
    <div className="management_container">
      <Sidebar />
      <div className="elements_container">
        <Topbar/>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Management;
