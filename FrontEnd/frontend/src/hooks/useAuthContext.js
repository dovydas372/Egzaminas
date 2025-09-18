import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useWorkoutContext turi būti WorkoutContextProvider viduje");
  }
  return context;
};
