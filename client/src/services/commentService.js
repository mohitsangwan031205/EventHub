import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/comments`;

export const getComments = async (mediaId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addComment = async (mediaId, text) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    {
      mediaId,
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
