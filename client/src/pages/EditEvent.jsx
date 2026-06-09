import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import { getEventById, updateEvent } from "../services/eventService";

function EditEvent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");

  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);

        setTitle(data.title);

        setDescription(data.description);

        setLocation(data.location);

        setDate(data.date.split("T")[0]);

        setCategory(data.category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEvent(id, {
        title,
        description,
        location,
        date,
        category,
      });

      setMessage("Event updated successfully");

      setTimeout(() => {
        navigate(`/events/${id}`);
      }, 1000);
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Edit Event</h1>

        {message && <p className="auth-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
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

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </Layout>
  );
}

export default EditEvent;
