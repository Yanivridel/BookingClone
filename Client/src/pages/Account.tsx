import TopNav from "@/components/TopNav";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import LiveFooter from "@/components/LiveFooter";
import Footer from "@/components/Footer";

function Account() {
  return (
    <div>
      <TopNav />
      <Outlet />
      {/* <Layout /> */}
      <LiveFooter />
      <Footer></Footer>
    </div>
  );
}

export default Account;
