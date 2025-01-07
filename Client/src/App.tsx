import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
          element: <Home />,
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
