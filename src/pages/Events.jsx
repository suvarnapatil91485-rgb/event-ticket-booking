import EventCard from "../components/EventCard";

function Events() {
  const events = [
    {
      id: 1,
      title: "Music Festival",
      venue: "Bengaluru",
      date: "15 October 2026",
      price: "₹999",
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      venue: "Bengaluru",
      date: "5 November 2026",
      price: "₹799",
    },
    {
      id: 3,
      title: "Art & Culture Fest",
      venue: "Delhi",
      date: "12 November 2026",
      price: "₹499",
    },
    {
      id: 4,
      title: "Arijit Singh Live",
      venue: "Mumbai",
      date: "20 October 2026",
      price: "₹1499",
    },
  ];

  return (
    <main className="events-page">
      <h1>Upcoming Events</h1>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            venue={event.venue}
            date={event.date}
            price={event.price}
          />
        ))}
      </div>
    </main>
  );
}

export default Events;