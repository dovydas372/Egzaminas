import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const CreateConsole = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/console/create`,
        {
          title,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setSuccessMsg("Konsolė sėkmingai pridėta!");
      setErrorMsg("");
      setTitle("");
      setDescription("");
      setImage("");
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Nepavyko sukurti konsolės");
      setSuccessMsg("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Sukurti naują konsolę</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Pavadinimas</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Aprašymas</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nuotraukos URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Pridėti konsolę
        </button>
      </form>
    </div>
  );
};

export default CreateConsole;
