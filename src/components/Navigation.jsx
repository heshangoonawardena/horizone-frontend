import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

function Navigation() {
  return (
    <nav className="z-10 flex items-center justify-between px-8 py-4 text-white bg-slate-800">
      <div className="flex items-center space-x-8">
        <NavLink to="/" className="text-2xl font-bold ">
          Horizone
        </NavLink>
        <div className="hidden space-x-6 md:flex">
          <Button variant="ghost" className="">
            <NavLink to="/hotels/create" className="transition-colors ">
              Create Hotel
            </NavLink>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="">
          <Globe className="w-5 h-5 mr-2" />
          EN
        </Button>
        <Button variant="ghost" asChild>
          <NavLink to="/sign-in">Log In</NavLink>
        </Button>
        <Button asChild>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </Button>
        {/* <div>
          <p>{ user.name }</p>
        </div> */}
      </div>
    </nav>
  );
}

export default Navigation;
