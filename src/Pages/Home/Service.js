import React from "react";

const Service = ({ service }) => {
  const { cardTitle, cardDescription, img } = service;

  return (
    <div className="card bg-base-100 shadow-xl ">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{cardTitle}</h2>
        <p className="font-normal text-xs ">{cardDescription}</p>
      </div>
    </div>
  );
};

export default Service;
