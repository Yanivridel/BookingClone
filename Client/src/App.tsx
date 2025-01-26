import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "./pages/Layout.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import EmailCode from "./pages/EmailCode.tsx";
import Account from "./pages/Account.tsx";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlices.ts";
import { getSelf } from "./utils/api/userApi.ts";
import Property from "./pages/Property.tsx";
import MyAccountPage from "./pages/MyAccountPage.tsx";

import SavedLists from "./pages/SavedLists.tsx";
import MySettings from "./pages/MySettings.tsx";
import NotFound from "./pages/NotFound.tsx";
import Testing from "./pages/Testing.tsx";

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/searchresults",
          element: <SearchResults />,
        },
        {
          path: "/property/:id",
          element: <Property />,
        },
        {
          path: '/test',
          element: <Testing />
        },
        {
          path: "*",
          element: <NotFound />,
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
        {
          element: <MyAccountPage />,
          path: "MyAccountPage",
        },
        {
          element: <SavedLists />,
          path: "saved-lists/:listName",
        },
        {
          element: <MySettings />,
          path: "MySettings/:category",
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const reloadUser = async () => {
    const user = await getSelf();
    if (user) dispatch(setUser(user));
  };

  useEffect(() => {
    reloadUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
