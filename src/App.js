import "./App.css";
import Navbar from "./Pages/Shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Appointment from "./Pages/Appointment/Appointment";
import SignUp from "./Pages/Signup/SignUp";
import RequireAuth from "./Pages/Login/RequireAuth";
import Reviews from "./Pages/Home/Reviews";
import ContactUs from "./Pages/Home/ContactUs";
import Practics from "./Pages/Practics/Practics";
import ResetPassword from "./Pages/Login/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashborad/Dashboard";
import MyAppointment from "./Pages/Dashborad/MyAppointment";
import MyReview from "./Pages/Dashborad/MyReview";
import MyHistory from "./Pages/Dashborad/MyHistory";
import AllUsers from "./Pages/Dashborad/AllUsers";
import RequireAdmin from "./Pages/Login/RequireAdmin";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/practice" element={<Practics></Practics>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointment></Appointment>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointment></MyAppointment>}></Route>
          <Route path="myreview" element={<MyReview></MyReview>}></Route>
          <Route path="myhistory" element={<MyHistory></MyHistory>}></Route>
          <Route
            path="allusers"
            element={
              <RequireAdmin>
                <AllUsers></AllUsers>
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route path="/reviews" element={<Reviews></Reviews>}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/resetpassword"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
