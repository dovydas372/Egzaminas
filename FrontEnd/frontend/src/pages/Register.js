import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    alert(`Registracija: ${username}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Registracija</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-3 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full"
        />
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white p-2 w-full rounded"
        >
          Registruotis
        </button>
      </div>
    </div>
  );
}
