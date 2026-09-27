import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;