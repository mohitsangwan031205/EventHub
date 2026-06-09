import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/favorites`;

export const toggleFavorite = async (mediaId) => {
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

export const getFavoriteStatus = async (mediaId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyFavorites = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/favorites/my-favorites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
