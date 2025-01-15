import TopNav from "@/components/TopNav";
import { Outlet } from "react-router-dom";

function Account() {
  return (
    <div>
      <TopNav />
      <Outlet />
    </div>
  );
}

export default Account;
