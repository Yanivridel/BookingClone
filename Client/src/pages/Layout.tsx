import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import LiveFooter from "@/components/LiveFooter";

function Layout() {
  // const data = "data";
  return (
    <div>
      <TopNav />
      <div>
        <Outlet />
      </div>
      <LiveFooter />
      <Footer></Footer>
    </div>
  );
}

export default Layout;
