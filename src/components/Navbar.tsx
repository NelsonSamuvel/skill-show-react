import { Link, NavLink } from "react-router-dom";
import ProfileMenu from "./Profile/ProfileMenu";
import { Button } from "./UI/button";
import type { User } from "@/types/userType";

const Navbar = ({ user }: { user: User }) => {
  return (
    <header>
      <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <NavLink to={"/"}>
            <img src="/logo.svg" alt="logo" className="w-12 h-12" />
          </NavLink>
          <ul className="flex gap-4 text-md">
            <li className="text-hover">
              <NavLink to={"/"}>Browse</NavLink>
            </li>
            <li className="text-hover">
              <NavLink to={"/"}>Dashboard</NavLink>
            </li>
          </ul>
        </div>

        {user ? (
          <ProfileMenu />
        ) : (
          <ul className="flex gap-4">
            <li>
              <Button
                asChild
                className="cursor-pointer bg-green-dark hover:bg-green-dark/90 text-white"
              >
                <Link to={"/auth"}>Sign up</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                className="cursor-pointer bg-transparent border hover:bg-surface text-white"
              >
                <Link to={"/auth?mode=login"}>Login</Link>
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
