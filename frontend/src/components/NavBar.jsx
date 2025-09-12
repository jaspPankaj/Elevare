import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../auth";

function NavBar  () {

  const {isAuthorized, logout} = useAuthentication();

  const handleLogout = () =>{
    logout();
  }



  return (
    <nav className="bg-background shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-primary">Elevare</div>

      {/* Buttons */}
      <div className="space-x-4">
        {isAuthorized ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-card text-secondary font-medium rounded-lg hover:bg-foreground transition"
          >
            Logout
          </button>
          
        ) : (
          <>
            <Link
              to="/login"
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
          </>
          
        )}
      </div>
    </nav>
  );
} export default NavBar;
