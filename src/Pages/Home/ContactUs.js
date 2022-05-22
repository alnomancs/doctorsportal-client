import React from "react";
import PrimaryButton from "../Shared/PrimaryButton";
import appointment from "../../assets/images/appointment.png";

const ContactUs = () => {
  return (
    <section
      className="flex flex-col justify-center "
      style={{
        background: `url(${appointment})`,
      }}
    >
      <h4 className="text-primary text-xl pt-10">Contact Us </h4>
      <h2 className="text-3xl text-white">Stay Connected with us</h2>

      <div className="max-w-lg mx-auto py-10">
        <form action="">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="mb-6">
            <textarea
              className="textarea input-bordered input-primary w-full max-w-xs"
              placeholder="Bio"
            ></textarea>
          </div>

          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
