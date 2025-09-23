import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const ConsoleDescription = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [console, setConsole] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const createReservation = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reservation/create`,
        {
          consoleId: console._id,
          dateFrom,
          dateTo,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Rezervacija sukurta:", response.data);
    } catch (err) {
      console.error("Klaida rezervuojant:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchConsole = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/console/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setConsole(response.data);
      } catch (err) {
        console.error("Nepavyko gauti konsolės:", err);
      }
    };

    fetchConsole();
  }, []);
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      {console ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{console.title}</h1>
          <p className="text-gray-700 mb-4">{console.description}</p>
          {console.image && (
            <img
              src={console.image}
              alt={console.title}
              className="w-100 h-100 object-cover rounded"
            />
          )}
          {user.role === "admin" && (
            <p className="mt-4 text-sm text-gray-500">
              Statusas: <span className="font-medium">{console.status}</span>
            </p>
          )}
          <h2
            onClick={() => setIsHidden(!isHidden)}
            className="hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-200 max-w-40 rounded text-center"
          >
            Rezervuoti konsolę
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createReservation();
            }}
            className={
              isHidden
                ? "hidden"
                : "bg-white p-4 rounded shadow-md w-full max-w-sm"
            }
          >
            <label className="block mb-2">
              Pradžia:
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border p-2 w-full rounded mt-1"
                required
              />
            </label>

            <label className="block mb-4">
              Pabaiga:
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border p-2 w-full rounded mt-1"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition-colors"
            >
              Rezervuoti
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">Konsolė kraunasi...</p>
      )}
    </div>
  );
};

export default ConsoleDescription;
