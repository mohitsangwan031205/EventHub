import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const deleteEvent = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${API_URL}/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEventMedia = async (eventId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/media/event/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const uploadMedia = async (eventId, imageFiles, visibility) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  formData.append("eventId", eventId);

  formData.append("visibility", visibility);

  const response = await axios.post(
    "http://localhost:5000/api/media/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteMedia = async (mediaId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `http://localhost:5000/api/media/${mediaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const bulkDeleteMedia = async (mediaIds) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    "http://localhost:5000/api/media/bulk-delete",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: {
        mediaIds,
      },
    },
  );

  return response.data;
};
