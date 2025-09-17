import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/main" className="text-xl font-bold">
              GameRent
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/main" className="hover:text-gray-300">
              Pagrindinis
            </Link>
            <Link to="/reservations" className="hover:text-gray-300">
              Mano rezervacijos
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Atsijungti
            </Link>
          </div>

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
          <Link
            to="/main"
            className="block px-3 py-2 rounded-md hover:bg-gray-700"
          >
            Pagrindinis
          </Link>
          <Link
            to="/reservations"
            className="block px-3 py-2 rounded-md hover:bg-gray-700"
          >
            Mano rezervacijos
          </Link>
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-700">
            Atsijungti
          </Link>
        </div>
      )}
    </nav>
  );
}
