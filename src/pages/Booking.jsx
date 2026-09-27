import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";

function Booking() {
  const location = useLocation();

  const event = location.state?.event;

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState("");
  const [ticketType, setTicketType] = useState("");

  async function handleBooking() {
  if (!name || !tickets || !ticketType) {
    alert("Please fill all the details");
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .insert([
      {
        name: name,
        event: event?.title || "Unknown Event",
        venue: event?.venue || "Unknown Venue",
        date: event?.date || "Unknown Date",
        tickets: Number(tickets),
        ticket_type: ticketType,
      },
    ]);

  if (error) {
    console.error(error);
    alert("Booking failed");
    return;
  }

  alert("Ticket booked successfully!");

  setName("");
  setTickets("");
  setTicketType("");
}

  return (
    <main className="booking-page">
      <h1>Book Your Ticket</h1>

      {event && (
        <section className="selected-event">
          <h2>{event.title}</h2>
          <p>📍 {event.venue}</p>
          <p>📅 {event.date}</p>
          <p>💰 {event.price}</p>
        </section>
      )}

      <div className="booking-form">

        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Number of Tickets</label>

        <input
          type="number"
          min="1"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          placeholder="Enter number of tickets"
        />

        <label>Ticket Type</label>

        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="">-- Select Ticket Type --</option>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="Premium">Premium</option>
        </select>

        <button onClick={handleBooking}>
          Confirm Booking
        </button>

      </div>

      <section className="booking-details">
        <h3>Booking Details</h3>

        <p>
          Name: <strong>{name || "-"}</strong>
        </p>

        <p>
          Tickets: <strong>{tickets || "-"}</strong>
        </p>

        <p>
          Ticket Type: <strong>{ticketType || "-"}</strong>
        </p>
      </section>
    </main>
  );
}

export default Booking;