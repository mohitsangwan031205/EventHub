import Layout from "../components/Layout";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Login</h1>
        {message && <p className="auth-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
