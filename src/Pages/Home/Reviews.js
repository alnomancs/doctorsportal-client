import React from "react";
import client1 from "../../assets/images/people1.png";
import client2 from "../../assets/images/people2.png";
import client3 from "../../assets/images/people3.png";
import bg from "../../assets/icons/quote.svg";
import Review from "./Review";

const Reviews = () => {
  const reviews = [
    {
      _id: 1,
      reviewText:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: client1,
      client: "Winson Herry",
      location: "california",
    },
    {
      _id: 2,
      reviewText:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: client2,
      client: "Winson Herry",
      location: "california",
    },
    {
      _id: 3,
      reviewText:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: client3,
      client: "Winson Herry",
      location: "california",
    },
  ];
  return (
    <section className="my-24 text-left">
      <div className="flex justify-between">
        <div>
          <h4 className="text-primary text-xl font-bold">Testimonial</h4>
          <h3 className="text-3xl font-normal ">What Our Patient Says</h3>
        </div>
        <div>
          <img className="lg:w-48 w-24" src={bg} alt="" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
