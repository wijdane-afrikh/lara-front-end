import React from "react";
import "./Dash.scss";
import Nav from "./Nav/Nav";
import Home from "./Home/Home";
import { useState } from "react";
import Header from "./Header/Header";
function Dahs() {
  const [active, setactive] = useState(false);
  return (
    <main>
      <Nav active={active} />
      <div className={`Main ${active ? "active" : ""}`}>
        <Header setactive={setactive} />
        <Home />
      </div>
    </main>
  );
}

export default Dahs;
