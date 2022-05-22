import React from "react";
import Service from "./Service";

import fluoridef from "../../assets/images/fluoride.png";
import cavity from "../../assets/images/cavity.png";
import whitening from "../../assets/images/whitening.png";
import treatment from "../../assets/images/treatment.png";
import PrimaryButton from "../Shared/PrimaryButton";

const Services = () => {
  const cardDescription =
    "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the";
  const services = [
    {
      _id: 1,
      cardTitle: "Fluoride Treatment",
      cardDescription: cardDescription,
      img: fluoridef,
    },
    {
      _id: 2,
      cardTitle: "Cavity Filling",
      cardDescription: cardDescription,
      img: cavity,
    },
    {
      _id: 3,
      cardTitle: "Teeth Whitening",
      cardDescription: cardDescription,
      img: whitening,
    },
  ];
  return (
    <div className="my-20">
      <div className="text-center text-2xl font-bold uppercase">
        <h3 className="text-primary">Our Services</h3>
        <h2 className="text-4xl">Service We Provide</h2>
        <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-10 gap-5">
          {services.map((service) => (
            <Service service={service} key={service._id}></Service>
          ))}
        </div>
      </div>

      <div className="hero min-h-screen text-left">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={treatment}
            className="max-w-sm rounded-lg shadow-2xl"
            alt=""
          />
          <div className=" lg:mx-20">
            <h1 className="text-5xl font-bold">
              Exceptional Dental Care, on Your Terms
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
