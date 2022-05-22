import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import PracticsBookingModal from "./PracticsBookingModal";
import PracticsService from "./PracticsService";

const PracticsAppointment = ({ date, setDate }) => {
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);
  return (
    <div className="mt-10 mb p-10 rounded-3xl border-2 border-sky-500">
      <h4 className="text-xl text-secondary text-centerw">
        Available Appointment on: {format(date, "PP")}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <PracticsService
              key={service._id}
              service={service}
              setTreatment={setTreatment}
            ></PracticsService>
          ))}
          {treatment && (
            <PracticsBookingModal
              date={date}
              treatment={treatment}
              setTreatment={setTreatment}
            ></PracticsBookingModal>
          )}
        </div>
      </h4>
    </div>
  );
};

export default PracticsAppointment;
