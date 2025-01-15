import TopNav from "@/components/TopNav";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

function Account() {
  return (
    <div>
      <TopNav />
      <Outlet />
      {/* <Layout /> */}
    </div>
  );
}

export default Account;
