function Navbar() {
  return (
    <nav className="navbar">
      <h2>EventHub</h2>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/booking">Booking</a>
        <a href="/history">History</a>
      </div>
    </nav>
  );
}

export default Navbar;