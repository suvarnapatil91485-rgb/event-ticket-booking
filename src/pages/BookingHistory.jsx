import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editTickets, setEditTickets] = useState("");
  const [editTicketType, setEditTicketType] = useState("");

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to load bookings");
      return;
    }

    setBookings(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  function startEditing(booking) {
    setEditingId(booking.id);
    setEditTickets(booking.tickets);
    setEditTicketType(booking.ticket_type);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditTickets("");
    setEditTicketType("");
  }

  async function updateBooking(id) {
    if (!editTickets || !editTicketType) {
      alert("Please fill all the details");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        tickets: Number(editTickets),
        ticket_type: editTicketType,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update booking");
      return;
    }

    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              tickets: Number(editTickets),
              ticket_type: editTicketType,
            }
          : booking
      )
    );

    cancelEditing();

    alert("Booking updated successfully!");
  }

  async function cancelBooking(id) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to cancel booking");
      return;
    }

    setBookings(
      bookings.filter((booking) => booking.id !== id)
    );

    alert("Booking cancelled successfully!");
  }

  return (
    <main className="history-page">
      <h1>Booking History</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="history-list">
          {bookings.map((booking) => (
            <div className="history-card" key={booking.id}>
              <h2>{booking.event}</h2>

              <p>📍 {booking.venue}</p>
              <p>📅 {booking.date}</p>
              <p>👤 Name: {booking.name}</p>

              {editingId === booking.id ? (
                <>
                  <label>Number of Tickets</label>

                  <input
                    type="number"
                    min="1"
                    value={editTickets}
                    onChange={(e) =>
                      setEditTickets(e.target.value)
                    }
                  />

                  <label>Ticket Type</label>

                  <select
                    value={editTicketType}
                    onChange={(e) =>
                      setEditTicketType(e.target.value)
                    }
                  >
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                    <option value="Premium">Premium</option>
                  </select>

                  <button
                    className="save-button"
                    onClick={() => updateBooking(booking.id)}
                  >
                    Save Changes
                  </button>

                  <button
                    className="cancel-edit-button"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>🎟️ Tickets: {booking.tickets}</p>
                  <p>🎫 Type: {booking.ticket_type}</p>

                  <button
                    className="edit-button"
                    onClick={() => startEditing(booking)}
                  >
                    Edit Booking
                  </button>

                  <button
                    className="cancel-button"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default BookingHistory;