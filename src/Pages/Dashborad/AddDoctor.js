import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: services } = useQuery("services", () =>
    fetch(`http://localhost:5001/services`).then((res) => res.json())
  );

  const imgStorageKey = "af3ff6e56a76e8e968814837af12f48a";

  /**
   * 3 way to store images
   * 1. third party storage ..free open public storage is ok for practics project
   * 2. your own storage in your own server (file system)
   * 3. mongodb
   *
   * yup: to validate file: yup file validation form react form hook.
   */

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    const image = data.image[0];
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specility: data.specility,
            img: img,
          };
          //send to your database
          fetch(`http://localhost:5001/doctor`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                console.log(inserted);
                toast.success("Doctor Added");
                reset();
              } else {
                toast.error("Failed to add the doctor");
              }
            });
        }
        console.log("imagebb result", result);
      });
  };
  return (
    <div>
      <h2 className="text-2xl">Add New Doctor</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: { value: true, message: "Name is Required" },
              //   pattern: {
              //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              //     message: "Provide a valid Email",
              //   },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.name.message}
              </span>
            )}
            {/* {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )} */}
          </label>
        </div>

        {/* Email */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: { value: true, message: "Email is Required" },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-700">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        {/* Specility */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specility</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("specility", {
              required: { value: true, message: "Specility is Required" },
            })}
          >
            {services?.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: { value: true, message: "Image is Required" },
              //   pattern: {
              //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              //     message: "Provide a valid Email",
              //   },
            })}
          />
          <label className="label">
            {errors.image?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.image.message}
              </span>
            )}
            {/* {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )} */}
          </label>
        </div>

        <input
          className="form-control w-full max-w-xs btn text-white mt-5"
          type="submit"
          value="Add Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
