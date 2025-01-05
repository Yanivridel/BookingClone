import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlices";
import { getSelf } from "./utils/userApi";
// Functions
import { getCookie } from "./utils/cookies";



import Search from "./components/search";

import { useTranslation } from 'react-i18next';
import { Button } from "./components/ui/button";
import ImageCard from "./components/ImageCard";
import CardWithDescription from "./components/CardWithDescritpion";
import MainNav from "./components/MainNav";
import TopNav from "./components/TopNav";
import HamburgerNav from "./components/HamburgerNav";


// Example how to get current User from Redux :
// import { useSelector } from "react-redux";
// import { RootState } from "./store";
// const currentUser = useSelector((state: RootState) => state.currentUser);
//

function App() {
  // const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  console.log("i18n initialized:", i18n);

  const changeLanguage = (lng: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lng);
    } else {
      console.error("i18n.changeLanguage is not available.");
    }
  };

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

  return (
    <BrowserRouter>
        <HamburgerNav />
  <div className="p-4">
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      <p>{t('description')}</p>
      <div className="mt-4">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => changeLanguage('he')}
        >
          עברית
        </button>

      </div>
      </div>
      <Search></Search>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
