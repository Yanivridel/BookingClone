import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "./pages/Layout.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Home from "./pages/Home.tsx";
import UserSetting from "./pages/UserSetting.tsx";
import SignIn from "./pages/SignIn.tsx";
import EmailCode from "./pages/EmailCode.tsx";
import Account from "./pages/Account.tsx";

// * Example how to get current User from Redux :
// * import { useSelector } from "react-redux";
// * import { RootState } from "./store";
// * onst currentUser = useSelector((state: RootState) => state.currentUser);

function App() {
  // const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home country="bongarta" />,
        },
        {
          path: "/searchresults",
          element: <SearchResults />,
        },
        {
          path: "/usersetting",
          element: <UserSetting />,
        },
      ],
    },

    {
      element: <Account />,
      path: "/account",
      children: [
        {
          element: <SignIn />,
          path: "sign-in",
        },
        {
          element: <EmailCode />,
          path: "email-code/:email",
        },
      ],
    },
  ]);

  // const reloadUser = async () => {
  //   const token = getCookie('token');
  //   if (token) {
  //       const user = await getSelf(token);
  //       if(user)
  //         dispatch(setUser(user));
  //   }
  // }

  useEffect(() => {
    // reloadUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
