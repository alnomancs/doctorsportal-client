import React from "react";
import { toast } from "react-toastify";

const DoctorRow = ({ doctor, index, refetch }) => {
  const { name, email, specility, img } = doctor;

  const handleDelete = (email) => {
    fetch(`http://localhost:5001/doctor/${email}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success(`Doctor: ${name} is deleted`);
          refetch();
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-16 rounded-full ring ring-blue-600 ring-offset-base-100 ring-offset-2">
            <img src={img} alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{specility}</td>
      <td>
        {" "}
        <button
          className="btn btn-xs  btn-outline btn-error text-zinc-900"
          onClick={() => handleDelete(email)}
        >
          X
        </button>{" "}
      </td>
    </tr>
  );
};

export default DoctorRow;
