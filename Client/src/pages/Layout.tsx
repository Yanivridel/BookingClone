import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

function Layout() {
  const data = "data";
  return (
    <div>
      <TopNav />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
