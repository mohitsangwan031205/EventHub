import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/users`;

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
