import React from "react";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Footer from "../Shared/Footer";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Reviews from "./Reviews";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Info></Info>
      <Services></Services>
      <MakeAppointment></MakeAppointment>
      <Reviews></Reviews>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
