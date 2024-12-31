import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlices";
import { getSelf } from "./utils/userApi";
// Functions
import { getCookie } from "./utils/cookies";


// Example how to get current User from Redux :
import { useSelector } from "react-redux";
import { RootState } from "./store";
const currentUser = useSelector((state: RootState) => state.currentUser);
// 

function App() {
  const dispatch = useDispatch();

  const reloadUser = async () => {
    const token = getCookie('token');
    if (token) {
        const user = await getSelf(token);
        if(user)
          dispatch(setUser(user));
    }
  }

  useEffect( () => {
    reloadUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
