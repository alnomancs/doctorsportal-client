import React from "react";

const PracticsService = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-2xl">{name}</h2>
        <p className="text-zinc-700 text-base">
          {slots.length ? (
            slots[0]
          ) : (
            <span className="text-red-600">Try another day</span>
          )}
        </p>
        <p className="text-base">
          {slots.length}
          {slots.length ? (
            <span> spaces available</span>
          ) : (
            <span> space available</span>
          )}
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="practics-booking-modal"
            className="btn btn-primary bg-gradient-to-r from-cyan-500 to-blue-500"
            disabled={slots.length === 0}
            onClick={() => setTreatment(service)}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default PracticsService;
