import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ConsoleDescription = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selectConsole, setSelectConsole] = useState(null);
  const [busyDates, setBusyDates] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const changecolor = (word) => {
    if (word === "laukia patvirtinimo") {
      return "bg-red-500 text-white";
    } else {
      return "bg-green-500 text-white";
    }
  };

  const fetchConsoleData = async () => {
    try {
      const consoleResp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/console/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setSelectConsole(consoleResp.data);

      const busyResp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/reservation/byConsole/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setBusyDates(busyResp.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && user?.token) fetchConsoleData();
  }, [id, user?.token]);

  const createReservation = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reservation/create`,
        {
          consoleId: selectConsole._id,
          dateFrom,
          dateTo,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setErrorRes("");

      fetchConsoleData();
    } catch (err) {
      setErrorRes(err.response?.data?.error || "Įvyko klaida rezervuojant");
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      {selectConsole ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{selectConsole.title}</h1>
          <p className="text-gray-700 mb-4">{selectConsole.description}</p>
          {selectConsole.image && (
            <img
              src={selectConsole.image}
              alt={selectConsole.title}
              className="w-100 h-100  rounded mb-4"
            />
          )}

          {user.role === "admin" ? (
            <button
              onClick={() =>
                navigate(`/createConsole/${selectConsole._id}/edit`)
              }
              className="bg-blue-500 m-auto max-w-28 text-white p-2 w-full rounded hover:bg-blue-600 transition-colors"
            >
              redaguoti
            </button>
          ) : (
            <>
              <h2
                onClick={() => setIsHidden(!isHidden)}
                className="hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-200 max-w-40 rounded text-center p-2 bg-gray-100 mb-4"
              >
                Rezervuoti konsolę
              </h2>

              {!isHidden && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createReservation();
                  }}
                  className="bg-white p-4 rounded shadow-md w-full max-w-sm mb-4"
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

                  {errorRes && <p className="text-red-500 mb-2">{errorRes}</p>}

                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition-colors"
                  >
                    Rezervuoti
                  </button>
                </form>
              )}
            </>
          )}

          <div>
            <h3 className="font-bold mb-2">Užimtos dienos:</h3>
            <ul className="list-disc list-inside">
              {busyDates.map((res) => (
                <li key={res._id} className="mb-5  max-w-96">
                  {new Date(res.dateFrom).toLocaleDateString()} -{" "}
                  {new Date(res.dateTo).toLocaleDateString()}{" "}
                  <span className={`p-2 rounded ${changecolor(res.status)}`}>
                    {res.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Konsolė kraunasi...</p>
      )}
    </div>
  );
};

export default ConsoleDescription;
