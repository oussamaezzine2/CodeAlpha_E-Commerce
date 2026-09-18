import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;