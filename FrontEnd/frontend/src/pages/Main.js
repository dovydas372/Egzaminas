import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";

export default function Main() {
  const navigate = useNavigate();
  const [consoles, setConsoles] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchConsoles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/console/all`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setConsoles(response.data);
      } catch (err) {
        console.error("Nepavyko gauti konsolių:", err);
      }
    };

    fetchConsoles();
  }, []);

  return (
    <div className="max-w-5xl md:mx-auto ml-3 gap-2">
      <h1 className="text-xl font-bold mb-4">Visos konsolės</h1>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-1">
        {consoles.map((c) => (
          <div
            onClick={() => navigate(`/console/${c._id}`)}
            key={c._id}
            className="border p-4 size-fit rounded shadow hover:shadow-lg transition duration-200 max-w-80 max-h-80 h-80"
          >
            <div className="flex items-center justify-between  p-4 ">
              <div className="flex-1">
                <h2 className="text-lg font-bold">{c.title}</h2>
                <p className="text-gray-600">{c.description}</p>
              </div>

              <div>
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
