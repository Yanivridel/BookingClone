import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

function Layout() {
  return (
    <div>
      <TopNav />
      <div className="max-w-[1100px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
