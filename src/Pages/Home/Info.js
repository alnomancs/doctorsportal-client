import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";

const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <InfoCard
        cartTitle="Opening Hour"
        img={clock}
        bgClass="bg-gradient-to-r from-cyan-500 to-blue-500"
      ></InfoCard>
      <InfoCard
        cartTitle="Visit Our Location"
        img={marker}
        bgClass="bg-zinc-800"
      ></InfoCard>
      <InfoCard
        cartTitle="Contact us now"
        img={phone}
        bgClass="bg-gradient-to-r from-cyan-500 to-blue-500"
      ></InfoCard>
    </div>
  );
};

export default Info;
