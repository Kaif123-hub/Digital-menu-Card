import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./Login";
import App from "./App";
import Home from "./Home";
import About from "./About";
import Foodgroup from "./Foodgroup";
import Qtymast from "./Qtymast";
import Menumast from "./Menumast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* App layout */}
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="Foodgroup" element={<Foodgroup />} />
          <Route path="Qtymast" element={<Qtymast />} />
          <Route path="Menumast" element={<Menumast />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
