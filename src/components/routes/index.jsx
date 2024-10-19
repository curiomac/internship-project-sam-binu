import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MANAGEMENT_BASE_PAGE, MANAGEMENT_PAGES } from "../../helpers/paths";
import Management from "../pages/management/Management";
import MobileApp from "../pages/management/layouts/mobile-app/MobileApp";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={MANAGEMENT_BASE_PAGE} element={<Management />}>
          <Route
            path={MANAGEMENT_PAGES.MOBILE_APP_PAGE}
            element={<MobileApp />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;