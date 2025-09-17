import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // čia vėliau siųsime fetch/axios į backend
    alert(`Prisijungimas: ${username}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Prisijungimas</h1>
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
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Prisijungti
        </button>
      </div>
    </div>
  );
}
