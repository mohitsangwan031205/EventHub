import Layout from "../components/Layout";
import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      console.log(data);

      setMessage("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Register</h1>
        {message && <p className="auth-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
