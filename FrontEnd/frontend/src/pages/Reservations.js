import React from "react";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
const Reservations = () => {
  useEffect(() => {
    const fetchReservations = async () => {
      console.log(useContext(AuthContext));
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservation/all`
        );
        setReservations(response.data);
      } catch (err) {
        console.error("Nepavyko gauti rezervacijų:", err);
      }
    };

    fetchReservations();
  }, []);

  return <div>Reservations</div>;
};

export default Reservations;
