import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservation/my-reservations`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setReservations(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Nepavyko gauti rezervacijų");
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

  useEffect(() => {
    fetchReservations();
  }, [user]);

  if (loading)
    return <p className="text-center mt-4">Kraunasi rezervacijos...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Mano rezervacijos</h1>
      {reservations.length === 0 ? (
        <p className="text-gray-500">Nėra rezervacijų</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li
              key={res._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">
                {res.consoleId?.title || "Konsolė"}
              </h2>
              <p>Pradžia: {new Date(res.dateFrom).toLocaleDateString()}</p>
              <p>Pabaiga: {new Date(res.dateTo).toLocaleDateString()}</p>
              <p>
                Statusas:{" "}
                <span
                  className={
                    res.status === "laukia patvirtinimo"
                      ? "text-yellow-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {res.status}
                </span>
              </p>
              <button
                onClick={() => deleteReservation(res._id)}
                className=" bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Ištrinti
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
