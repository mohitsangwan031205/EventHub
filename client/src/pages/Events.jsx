import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();

        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || event.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return new Date(b.date) - new Date(a.date);

        case "Oldest":
          return new Date(a.date) - new Date(b.date);

        case "A-Z":
          return a.title.localeCompare(b.title);

        case "Z-A":
          return b.title.localeCompare(a.title);

        case "Category":
          return a.category.localeCompare(b.category);

        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="events-page">
        <div className="events-header">
          <h1>All Events</h1>
          <p>Explore upcoming events and activities</p>
        </div>

        <div className="events-controls">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>

            <option value="Technical">Technical</option>

            <option value="Cultural">Cultural</option>

            <option value="Sports">Sports</option>

            <option value="Workshop">Workshop</option>

            <option value="Other">Other</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="category-select"
          >
            <option value="Newest">Newest First</option>

            <option value="Oldest">Oldest First</option>

            <option value="A-Z">Name (A-Z)</option>

            <option value="Z-A">Name (Z-A)</option>

            <option value="Category">Category</option>
          </select>
        </div>

        {filteredEvents.length === 0 && (
          <div className="empty-events">
            <h2>No Events Yet</h2>
            <p>Create your first event to get started.</p>
          </div>
        )}

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="event-card"
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <div className="event-card-top">
                <h2>{event.title}</h2>

                <span className="event-badge">{event.category}</span>
              </div>

              <p className="event-description">{event.description}</p>

              <div className="event-info">
                <p>📍 {event.location}</p>

                <p>👤 {event.createdBy?.name}</p>

                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Events;
