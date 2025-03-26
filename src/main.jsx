import MainLayout from "@/layouts/MainLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import RootLayout from "@/layouts/RootLayout";
import { store } from "@/lib/store";
import AccountPage from "@/pages/AccountPage";
import CreateHotelPage from "@/pages/CreateHotelPage";
import HomePage from "@/pages/HomePage";
import HotelPage from "@/pages/HotelPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import AdminProtectedLayout from "./layouts/AdminProtectedLayout";
import FavoritesPage from "./pages/FavoritesPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route element={<RootLayout />}>
							<Route element={<MainLayout />}>
								<Route path="/" element={<HomePage />} />
								<Route path="/hotels/:id" element={<HotelPage />} />
								<Route element={<ProtectedLayout />}>
									<Route element={<AdminProtectedLayout />}>
										<Route
											path="/hotels/create"
											element={<CreateHotelPage />}
										/>
									</Route>
									<Route path="/account" element={<AccountPage />} />
									<Route path="/favorites" element={<FavoritesPage />} />
								</Route>
							</Route>
							<Route path="/sign-up" element={<SignUpPage />} />
							<Route path="/sign-in" element={<SignInPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</ClerkProvider>
);
