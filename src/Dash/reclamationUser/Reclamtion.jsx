import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Header from "../Header/Header";
import Ajouter from "./Ajouter";
import axios from "axios";

function Reclamtion() {
  const [active, setactive] = useState(false);
  const [reclamation, setreclamation] = useState([]);
  const [ajouter, setajouter] = useState(false);
  async function fetchReclamation() {
    axios.get("http://127.0.0.1:8000/api/reclamtion").then((res) => {
      setreclamation(res.data);
    });
  }
  useEffect(() => {
    fetchReclamation();
  }, []);
  if (localStorage.getItem("type") === "admin") {
    window.location.pathname = "/admin";
  }
  if (!localStorage.getItem("type")) {
    window.location.pathname = "/";
  }

  return (
    <>
      <main>
        <Nav active={active} />
        <div className={`Main ${active ? "active" : ""}`}>
          <Header setactive={setactive} />
          <div className="home-content">
            <div className="details">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Les Reclamations</h2>
                  <button className="btn-dash" onClick={() => setajouter(true)}>
                    Ajouter Reclamation 
                  </button>
                </div>
                <div className="box-container mt-3">
                  {reclamation
                    .filter(
                      (e) => e.user === parseInt(localStorage.getItem("idU"))
                    )
                    .map((e, i) => (
                      <div className="box" key={i}>
                        <p>{e.reclamation}</p>
                        <span
                          href="#"
                          className={`btn ${
                            e.status === "en cours"
                              ? "btn-warning"
                              : "btn-info"
                          }`}
                        >
                          {e.status === "en cours" ? "en cours ..." : e.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Ajouter
        ajouter={ajouter}
        setajouter={setajouter}
        reclamation={fetchReclamation}
      />
    </>
  );
}

export default Reclamtion;
