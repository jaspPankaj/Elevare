import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-background shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-primary">Elevare</div>

      {/* Buttons */}
      <div className="space-x-4">
        <Link
          to="#"
          className="px-4 py-2 text-primary font-medium rounded-lg hover:bg-foreground transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-card text-secondary font-medium rounded-lg hover:bg-foreground transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
