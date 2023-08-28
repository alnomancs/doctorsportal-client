import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DoctorRow from "./DoctorRow";

const ManageDoctor = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5001/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h2 className="text-2xl ">Manage Doctor : {doctors.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border-2">
          <thead>
            <tr>
              <th>SL</th>
              <th>Avater</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <DoctorRow
                key={doctor._id}
                doctor={doctor}
                index={index}
                refetch={refetch}
              ></DoctorRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctor;
