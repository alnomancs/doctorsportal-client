import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const PracticsBookingModal = ({ treatment, setTreatment, date }) => {
  const [user, loading] = useAuthState(auth);
  const { name, slots } = treatment;

  const handleSubmit = (event) => {
    event.preventDefault();

    setTreatment(null);
  };

  if (loading) return <Loading></Loading>;
  return (
    <div>
      <input
        type="checkbox"
        id="practics-booking-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="practics-booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{name}</h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 justify-items-center text-zinc-900"
          >
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="date"
              placeholder="Type here"
              value={format(date, "PP")}
              disabled
            />
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index}>{slot}</option>
              ))}
            </select>

            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="name"
              placeholder="Full Name"
              value={user?.displayName}
              disabled
            />
            <input
              className="input input-bordered w-full max-w-xs"
              type="email"
              placeholder="Email"
              name="email"
              value={user?.email}
              disabled
            />
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="phone"
              placeholder="Phone"
            />
            <input
              className="input input-bordered w-full max-w-xs"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PracticsBookingModal;
