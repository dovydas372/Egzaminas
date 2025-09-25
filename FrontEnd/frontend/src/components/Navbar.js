import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={user ? "/main" : "/login"} className="text-xl font-bold">
              GameRent
            </Link>
          </div>
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/main" className="hover:text-gray-300">
                Pagrindinis
              </Link>
              {user.role === "admin" ? (
                <>
                  <Link to="/reservations" className="hover:text-gray-300">
                    Visos rezervacijos
                  </Link>
                  <Link to="/createConsole" className="hover:text-gray-300">
                    Pridėti konsolę
                  </Link>
                </>
              ) : (
                <Link to="/myReservations" className="hover:text-gray-300">
                  Mano rezervacijos
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition-colors"
              >
                Atsijungti
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </div>
          )}

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <Link
                to="/main"
                className="block  py-2 rounded-md hover:bg-gray-700"
              >
                Pagrindinis
              </Link>
              {user.role === "admin" ? (
                <>
                  <Link
                    to="/reservations"
                    className="block  rounded-md hover:bg-gray-700"
                  >
                    Visos rezervacijos
                  </Link>
                  <Link
                    to="/createConsole"
                    className=" block  rounded-md hover:bg-gray-700"
                  >
                    Pridėti konsolę
                  </Link>
                </>
              ) : (
                <Link
                  to="/myReservations"
                  className=" block  rounded-md hover:bg-gray-700"
                >
                  Mano rezervacijos
                </Link>
              )}
              <Link
                to="/"
                className="block  rounded-md hover:bg-gray-700"
                onClick={handleLogout}
              >
                Atsijungti
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block  py-2 rounded-md hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
