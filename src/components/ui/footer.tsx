import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../config/navLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="sr-only">Home</span>
        </Link>

        <nav className="flex space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
