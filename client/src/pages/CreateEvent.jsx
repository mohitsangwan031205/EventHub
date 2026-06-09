import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { createEvent } from "../services/eventService";

function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Technical");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const data = await createEvent({
        title,
        description,
        date,
        location,
        category,
      });

      setMessage(data.message);

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Create Event</h1>

        {message && <p className="auth-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technical">Technical</option>

            <option value="Cultural">Cultural</option>

            <option value="Sports">Sports</option>

            <option value="Workshop">Workshop</option>

            <option value="Other">Other</option>
          </select>

          <button type="submit">Create Event</button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateEvent;
