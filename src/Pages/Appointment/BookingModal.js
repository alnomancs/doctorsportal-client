import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
  // const [user, loading, error] = useAuthState(auth);
  const [user] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const formattedDate = format(date, "PP");
  const handleSubmit = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;

    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot: event.target.slot.value,
      patientEmail: user.email,
      patientName: user.displayName,
      patientPhone: event.target.phone.value,
    };
    fetch("http://localhost:5001/booking", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(booking), //send data to server
    })
      .then((res) => res.json())
      .then((data) => {
        //to close the modal
        if (data.success) {
          toast(`Appointment is set, ${formattedDate} at ${slot}`);
          refetch();
          setTreatment(null);
        } else {
          toast.error(
            `You already have an appointment, ${data.booking?.date} at ${data.booking?.slot}`
          );
        }
      });
    refetch();
    setTreatment(null);
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Booking For : {name}</h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 justify-items-center"
          >
            <input
              type="text"
              placeholder="Type here"
              name="date"
              className="input input-bordered w-full max-w-xs"
              value={format(date, "PP")}
              disabled
            />
            <select
              className="select select-bordered w-full max-w-xs"
              name="slot"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={user?.displayName || ""}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <input
              type="text"
              name="email"
              value={user?.email || ""}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              placeholder="Submit"
              className="btn btn-secondary input input-bordered w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
