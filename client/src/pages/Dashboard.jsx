import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome Back, {user?.name} 👋</h1>

          <p>Manage your events and activities from here</p>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Email</h3>
            <p>{user?.email}</p>
          </div>

          <div className="dashboard-card">
            <h3>Role</h3>
            <p>{user?.role}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/create-event" className="dashboard-btn">
            ➕ Create Event
          </Link>

          <Link to="/events" className="dashboard-btn secondary-btn">
            📅 View Events
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
