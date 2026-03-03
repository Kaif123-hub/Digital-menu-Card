import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  const [cs, setCs] = useState("");

  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");


  return (
    <Card className="m-4">
      <Card.Header as="h3">Welcome {name}</Card.Header>

      <Card.Body>
        <Card.Title>User ID: {id}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {email}
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

