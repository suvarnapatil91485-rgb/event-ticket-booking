import { Link } from "react-router-dom";

function EventCard(props) {
  const event = {
    title: props.title,
    venue: props.venue,
    date: props.date,
    price: props.price,
  };

  return (
    <div className="event-card">
      <h2>{props.title}</h2>

      <p>📍 {props.venue}</p>
      <p>📅 {props.date}</p>
      <p>💰 {props.price}</p>

      <Link to="/booking" state={{ event: event }}>
        <button>Book Ticket</button>
      </Link>
    </div>
  );
}

export default EventCard;