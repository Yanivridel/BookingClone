import { Outlet } from "react-router-dom";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

function Layout() {
  // const data = "data";
  return (
    <div>
      <TopNav />
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
