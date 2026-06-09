import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

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
