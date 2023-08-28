import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5001/booking?patientEmail=${user.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            return navigate("/");
          }

          return res.json();
        })
        .then((data) => {
          setAppointments(data);
        });
    }
    // eslint-disable-next-line
  }, [user]);

  if (loading) return <Loading></Loading>;
  if (error) console.log(error.message);

  return (
    <div className="overflow-auto">
      <h2 className="text-2xl ">my appointment {appointments?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table relative w-full">
          <thead>
            <tr>
              <th className="sticky top-0"></th>
              <th className="sticky top-0">Name</th>
              <th className="sticky top-0">Date</th>
              <th className="sticky top-0">Time</th>
              <th className="sticky top-0">Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr key={appointment._id}>
                <th>{index + 1}</th>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
