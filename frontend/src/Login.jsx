import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyImage from "./assets/favicon.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState ("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    if (!email || !pwd) {
      alert("Email and Password required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: email,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === 200) {
        const user = res.data.user;

        localStorage.setItem("id", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);

        alert("Login Successful");
        navigate("/app");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid Email or Password");
      } else {
        alert("Server Error");
        console.error(err);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${MyImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "320px",
          background: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 className="text-center mb-3">Restaurant Login</h3>

        <Form.Control
          type="email"
          placeholder="Enter Email"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Form.Control
          type="password"
          placeholder="Enter Password"
          className="mb-3"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <Button variant="success" className="w-100" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}
