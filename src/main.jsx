import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "@/pages/HomePage";
import HotelPage from "@/pages/HotelPage";
import { StrictMode } from "react";
import RootLayout from "@/layouts/RootLayout";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedLayout";
import HotelsPage from "@/pages/HotelsPage";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import CreateHotelPage from "@/pages/CreateHotelPage";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import { ClerkProvider } from "@clerk/clerk-react";
import AccountPage from "@/pages/AccountPage";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/hotels/:id" element={<HotelPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/hotels/create" element={<CreateHotelPage />} />
                  <Route path="/account" element={<AccountPage />} />
                </Route>
              </Route>
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
