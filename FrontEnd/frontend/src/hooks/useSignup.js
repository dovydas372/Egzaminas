import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import axios from "axios";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        { username, password }
      );

      const json = response.data;

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      setError(err.response?.data?.error || "Įvyko klaida");
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
