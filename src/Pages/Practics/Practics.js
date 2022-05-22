import React, { useState } from "react";
import PracticsAppointment from "./PracticsAppointment";
import PracticsBanner from "./PracticsBanner";

const Practics = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <PracticsBanner date={date} setDate={setDate}></PracticsBanner>
      <PracticsAppointment date={date} setDate={setDate}></PracticsAppointment>
    </div>
  );
};

export default Practics;
