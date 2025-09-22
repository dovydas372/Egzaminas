import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const ConsoleDescription = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [console, setConsole] = useState(null);
  useEffect(() => {
    const fetchConsole = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/console/${id}`
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
        </>
      ) : (
        <p className="text-center text-gray-500">Konsolė kraunasi...</p>
      )}
    </div>
  );
};

export default ConsoleDescription;
