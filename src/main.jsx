import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/home.page";
import HotelPage from "./pages/hotel.page";
import { StrictMode } from "react";
import RootLayout from "./layouts/root.layout.";
import MainLayout from "./layouts/main.layout";
import HotelsPage from "./pages/hotels.page";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels/:id" element={<HotelPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
