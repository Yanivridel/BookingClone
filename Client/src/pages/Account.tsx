import TopNav from "@/components/TopNav";
import { Outlet } from "react-router-dom";
import LiveFooter from "@/components/LiveFooter";
import Footer from "@/components/Footer";

function Account() {
  return (
    <div className="">
      <TopNav />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow ">
          <Outlet />
        </main>
        <footer className="mt-auto flex-grow-0">
          <LiveFooter />
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export default Account;
