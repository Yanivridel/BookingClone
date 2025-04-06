import TopNav from "@/components/TopNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LiveFooter from "@/components/LiveFooter";
import Footer from "@/components/Footer";
import { IUser } from "@/types/userTypes";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Account() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const allowedPaths = ["/account/sign-in", "/account/email-code"];

    const isAllowed =
      currentUser?._id ||
      allowedPaths.some((path) => location.pathname.startsWith(path));

    if (!isAllowed) {
      navigate("/");
    }
  }, [currentUser, location.pathname]);

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
