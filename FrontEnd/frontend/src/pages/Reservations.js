import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext.js";

const Reservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservation/all`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setReservations(response.data);
    } catch (err) {
      console.error("Nepavyko gauti rezervacijų:", err);
      setError("Nepavyko gauti rezervacijų");
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/reservation/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      await fetchReservations();
    } catch (err) {
      console.error(
        "Nepavyko ištrinti rezervacijos:",
        err.response?.data || err.message
      );
    }
  };
  const confirmReservation = async (reservationId) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/reservation/${reservationId}/status`,
        { status: "patvirtinta" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      await fetchReservations();
      console.log("Rezervacija patvirtinta:", response.data);
    } catch (err) {
      console.error(
        "Klaida patvirtinant rezervaciją:",
        err.response?.data || err.message
      );
    }
  };
  useEffect(() => {
    if (user?.token) fetchReservations();
  }, [user]);

  if (loading)
    return <p className="text-center mt-4">Kraunasi rezervacijos...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Visos rezervacijos</h1>
      {reservations.length === 0 ? (
        <p className="text-gray-500">Nėra rezervacijų</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {reservations.map((res) => (
            <div
              key={res._id}
              className="border p-4 size-fit rounded shadow hover:shadow-lg transition duration-200"
            >
              <h2 className="font-bold text-lg mb-2">
                {res.consoleId?.title || "Konsolė"}
              </h2>
              <p>
                <span className="font-medium">Vartotojas:</span>{" "}
                {res.userId?.username || "Anonimas"}
              </p>
              <p>
                <span className="font-medium">Pradžia:</span>{" "}
                {new Date(res.dateFrom).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Pabaiga:</span>{" "}
                {new Date(res.dateTo).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Statusas:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    res.status === "laukia patvirtinimo"
                      ? "bg-yellow-500"
                      : res.status === "patvirtinta"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {res.status}
                </span>
              </p>
              <p className="mt-2 ">
                <button
                  onClick={() => deleteReservation(res._id)}
                  className="mr-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  atšaukti
                </button>
                <button
                  onClick={() => confirmReservation(res._id)}
                  className=" bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  priimti
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
