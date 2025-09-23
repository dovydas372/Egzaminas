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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Visos konsolės</h1>

      <ul>
        {consoles.map((c) => (
          <li
            onClick={() => navigate(`/console/${c._id}`)}
            key={c._id}
            className="border p-2 mb-2 rounded"
          >
            {c.title} – {c.description}
            <div>
              <img
                src={c.image}
                alt={c.title}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
