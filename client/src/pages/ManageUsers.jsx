import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { getAllUsers, updateUserRole } from "../services/userService";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);

      alert("Role updated successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);

      alert("Role update failed");
    }
  };

  return (
    <Layout>
      <div className="manage-users">
        <h1 className="man-title">Manage Users</h1>

        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div>
              <h3>{user.name}</h3>

              <p>{user.email}</p>
            </div>

            <div>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                <option value="viewer">Viewer</option>

                <option value="clubMember">Club Member</option>

                <option value="photographer">Photographer</option>

                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ManageUsers;
