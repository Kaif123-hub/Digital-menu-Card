import axios from "axios";
import { useEffect, useState } from "react";
import FullImage from "./assets/hero-bg.jpg";

export default function About() {
  const [data, setData] = useState([]);

  useEffect(() => {
    menucard();
  }, []);

  function menucard() {
    axios
      .get("http://192.168.29.139:3000/menucard")
      .then((response) => {
        setData(response.data.menulist);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      {/* Background Image */}
      <img
        src={FullImage}
        alt="Background"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      />

      {/* Overlay Content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "40px",
          color: "#fff",
          background: "rgba(0,0,0,0.45)", // dark overlay
        }}
      >
        <h1 className="text-center mb-4">Menu Card</h1>

        {/* Header Row (table-like) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 1fr",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          <div>Menu Name</div>
          <div>Price</div>
          <div>Group</div>
          <div>Qty</div>
        </div>

        {/* Data Rows */}
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 2fr 1fr",
              marginBottom: "10px",
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.3)", // optional
            }}
          >
            <div>{item.menu_name}</div>
            <div>{item.menu_price}</div>
            <div>{item.group_name}</div>
            <div>{item.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



