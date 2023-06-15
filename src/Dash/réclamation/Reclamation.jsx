import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
function Reclamation() {
  const [active, setactive] = useState(false);
  const [reclamation, setreclamation] = useState([]);
  async function fetchReclamation() {
    axios.get("http://127.0.0.1:8000/api/reclamtion").then((res) => {
      setreclamation(res.data);
    });
  }
  useEffect(() => {
    fetchReclamation();
  }, []);
  function UpdateS(id, status) {
    axios
      .post("http://127.0.0.1:8000/api/reclamtion/update/" + id, { status })
      .then((res) => {
        fetchReclamation();
      });
  }
  return (
    <>
      <main>
        <Nav active={active} />
        <div className={`Main ${active ? "active" : ""}`}>
          <Header setactive={setactive} />
          <div className="home-content">
            <div className="home-content">
              <div className="details">
                <div className="recentOrders">
                  <div className="cardHeader">
                    <h2>Les Reclamations</h2>
                  </div>
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th> Nom </th>
                          <th>reclamation </th>
                        
                          <th>Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reclamation.map((e, i) => (
                          <tr key={i}>
                            <td className="pt-3 pb-3"> {e.name} </td>
                            <td className="pt-3 pb-3"> {e.reclamation} </td>
                          
                            <td>
                              {e.status === "en cours" ? (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => UpdateS(e.idR, "Fait")}
                                >
                                  en cours
                                </button>
                              ) : (
                                <button
                                  className="btn btn-info me-3"
                                  onClick={() => UpdateS(e.idR, "en cours")}
                                >
                                  Fait
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reclamation;
