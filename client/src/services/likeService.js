import axios from "axios";

const API_URL = "http://localhost:5000/api/likes";

export const toggleLike = async (mediaId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/toggle`,
    {
      mediaId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getMediaLikes = async (mediaId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
