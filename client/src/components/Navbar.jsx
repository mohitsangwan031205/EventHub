import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../services/notificationService";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();

        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">EventHub</h2>

      <div className="navbar-right">
        <div className="nav-links">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "active-link" : "nav-link"
            }
          >
            Events
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/manage-users"
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              Manage Users
            </NavLink>
          )}

          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/create-event"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                Create Event
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                ⭐ My Favorites
              </NavLink>

              <div className="notification-wrapper">
                <button
                  className="notification-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <h4 class="noti">Notifications</h4>

                    {notifications.length === 0 ? (
                      <p>No notifications</p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`notification-item ${
                            notification.isRead ? "" : "unread"
                          }`}
                          onClick={async () => {
                            await markAsRead(notification._id);

                            setNotifications((prev) =>
                              prev.map((item) =>
                                item._id === notification._id
                                  ? {
                                      ...item,
                                      isRead: true,
                                    }
                                  : item,
                              ),
                            );
                          }}
                        >
                          <strong>{notification.sender?.name}</strong>{" "}
                          {notification.message}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="auth-section">
          {user ? (
            <>
              <span className="user-name">
                <span className="hello-sign">👋</span> {user?.name}
              </span>

              <button className="logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
