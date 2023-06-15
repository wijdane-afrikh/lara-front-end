import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
function FactureUser() {
    const [active, setactive] = useState(false);
    const [user, setuser] = useState([]);
    const fetchUser = () => {
      axios.get("http://127.0.0.1:8000/api/facture").then(res => setuser(res.data))
    }
    useEffect(() => {
      fetchUser();
    }, [])

  
  
 
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
                    <h2 className="mb-3">les Factures</h2>
                  
                  </div>
                  <div className="box-container mt-3">
                  {user.filter(e=>e.user===parseInt(localStorage.getItem("idU")))
                    .map((e, i) => (
                      <div className="box" key={i}>
                   
                        <p>Raison: {e.Raison}</p>
                        <p>Total:{e.Total} DH</p>
                        <span className={`btn ${e.Stauts!=="Non payé"?"btn-info":"btn-warning"}`}>
                        {e.Stauts}
                        </span>
                      </div>
                    ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  

export default FactureUser;
