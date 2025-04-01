import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import { Footer7 } from "@/components/ui/footer";

const MainLayout = () => {

  return (
		<>
			<Navigation />
			<Outlet />
			<Footer7 />
		</>
	);
};

export default MainLayout;  
