import React from "react";
import Nav from "../Nav/Nav";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import Ajouter from "./Ajouter";
function Facture() {
  const [active, setactive] = useState(false);
  const [ajouter, setajouter] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/facture")
      .then((res) => setuser(res.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  // delete
  const [id, setid] = useState(0);
  function DeleteUser(id) {
    setconfirm(true);
    setid(id);
  }
  function Supperimer(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/facture/delete/" + id)
      .then(() => {
        setconfirm(false);
        fetchUser();
      })
      .catch((e) => console.log(e));
  }
  // edit
  function update(id) {
    axios.post("http://127.0.0.1:8000/api/facture/update/" + id).then(() => {
      fetchUser();
    });
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
                  <h2>Tableau Facture</h2>
                  <button className="btn-dash" onClick={() => setajouter(true)}>
                    Ajouter Facture <i className="fa-solid fas-user"></i>
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th> Nom </th>
                        <th>Total </th>
                        <th> Raison</th>
                        <th>Status </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((e, i) => (
                        <tr key={i}>
                          <td className="pt-3 pb-3"> {e.name} </td>
                          <td className="pt-3 pb-3">{e.Total} DH</td>
                          <td className="pt-3 pb-3">{e.Raison} </td>
                          <td className="pt-3 pb-3">
                            <span
                              onClick={() => update(e.facture)}
                              className={`btn ${
                                e.Stauts !== "Non payé"
                                  ? "btn-info"
                                  : "btn-warning"
                              }`}
                            >
                              {e.Stauts}
                            </span>{" "}
                          </td>
                          <td className="pt-3 pb-3">
                            <button
                              className="btn btn-danger "
                              onClick={() => DeleteUser(e.facture)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
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
      </main>
      <Ajouter
        ajouter={ajouter}
        setajouter={setajouter}
        fetchUser={fetchUser}
      />
      <section className={`confirm ${confirm ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <div className="forms">
              <div className="form login">
                <div className="title"> Supprimer Facture</div>
                <form onSubmit={Supperimer}>
                  <p>es-tu sûr?</p>
                  <div className="button">
                    <button>
                      Supprimer Facture
                      <i className="fa-solid fa-trash ms-3"></i>
                    </button>
                    <button type="button" onClick={() => setconfirm(false)}>
                      Annuler
                      <i className="fa-solid fa-circle-xmark ms-3"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Facture;
