import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";

function Layout() {
  return (
    <div>
      <TopNav />

      <Outlet />
    </div>
  );
}

export default Layout;
