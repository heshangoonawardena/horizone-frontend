import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { NavLink } from "react-router";

function Navigation() {
  return (
    <nav className="z-10 flex items-center justify-between px-8 py-4 text-white bg-slate-800">
      <div className="flex items-center space-x-8">
        <NavLink to="/" className="text-2xl font-bold ">
          Horizone
        </NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="">
          <Globe className="w-5 h-5 mr-2" />
          EN
        </Button>
        <Button variant="ghost" asChild>
          <a href="/sign-in">Log In</a>
        </Button>
        <Button asChild>
          <a href="/sign-up">Sign Up</a>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
