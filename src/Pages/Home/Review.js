import React from "react";

const Review = ({ review }) => {
  const { reviewText, img, client, location } = review;
  return (
    <div className="card lg:max-w-lg  bg-base-100 shadow-xl text-left">
      <div className="card-body ">
        <p>{reviewText}</p>
        <div className="flex justify-start items-center gap-5 pt-5">
          <div className="avatar">
            <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold">{client}</span>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
