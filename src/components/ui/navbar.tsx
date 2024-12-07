import { Link, NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { navLinks } from "../config/navLinks";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { logOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="sr-only">Home</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-primary"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <DropdownMenuItem key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block w-full ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-gray-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <button className="w-full text-left">Log Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className="hidden md:inline-block"
          onClick={logOut}
        >
          Log Out
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
