import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "History", href: "/history" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 shadow-md shadow-blue-100",
        isScrolled ? "py-4 bg-white/80 backdrop-blur-lg shadow-sm" : "py-5"
      )}
    >
      <div className="flex items-center justify-evenly">
        <div>
          {/* Logo */}
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="/"
          >
            <h1 className="text-blue-600 text-2xl md:text-3xl">Elevare</h1>
          </a>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          {user && (
            <>
              {navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="px-4 py-2 text-xl font-semibold hover:border-b-2 hover:border-b-blue-600 rounded-sm  text-black transition duration-300"
                >
                  {item.name}
                </a>
              ))}
            </>
          )}
        </div>

        <div className="flex space-x-8 items-center">
          {!user && (
            <>
              <a
                href="/login"
                className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
              >
                Start Now
              </a>
            </>
          )}
        </div>

        {/* Desktop Menu */}
        {user && (
          <div className="hidden md:flex space-x-8 items-center">
            <p className="text-gray-600">
              Welcome{" "}
              <span className="font-semibold text-blue-700">
                {user.username} 🎉
              </span>
            </p>
            <button
              onClick={logout}
              className="px-6 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-500"
            >
              Logout
            </button>
          </div>
        )}

        {user && (
          <>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-gray-600 z-40"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <div
              className={cn(
                "fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
                isMenuOpen
                  ? "opacity-100 pointer-events-auto mt-24"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex flex-col space-y-8 text-xl justify-items-start p-4">
                <div className="space-y-8 items-center">
                  <p className="text-gray-600">
                    Welcome{" "}
                    <span className="font-semibold text-blue-700">
                      {user.username} 🎉
                    </span>
                  </p>
                </div>

                {navLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
