import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const EditConsole = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConsole = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/console/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
      } catch (err) {
        setError("Nepavyko užkrauti konsolės duomenų");
      }
    };

    if (id) fetchConsole();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/console/${id}`,
        { title, description, image },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      navigate("/main");
    } catch (err) {
      setError(err.response?.data?.error || "Nepavyko atnaujinti konsolės");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Redaguoti konsolę</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className=" font-medium ">Pavadinimas:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pavadinimas"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className=" font-medium ">Aprašymas:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Aprašymas"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className=" font-medium ">Nuotraukos URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Nuotraukos URL"
            className="w-full border p-2 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Atnaujinti
        </button>
      </form>
    </div>
  );
};

export default EditConsole;
