import React from "react";
import Nav from "../Nav/Nav";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import Ajouter from "./Ajouter";
import { Link } from "react-router-dom";
import Voir from "./Voir";
function Ouvriers() {
  const [active, setactive] = useState(false);
  const [ajouter, setajouter] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/ouvrires")
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
      .post("http://127.0.0.1:8000/api/ouvrires/delete/" + id)
      .then(() => {
        setconfirm(false);
        fetchUser();
      })
      .catch((e) => console.log(e));
  }
  // edit

  const [voir, setvoir] = useState(false);
  function Show(id){
    setid(id);
    setvoir(true);
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
                  <h2>Tableau Ouvrier</h2>
                  <button className="btn-dash" onClick={() => setajouter(true)}>
                    Ajouter Ouvriers <i className="fa-solid fas-user"></i>
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th> Nom </th>
                        <th>Cin </th>
                        <th>Numero </th>
                        <th>Type de contract </th>
                        <th>Service</th>
                        <th>Salaire</th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((e, i) => (
                        <tr key={i}>
                          <td className="pt-3 pb-3"> {e.name} </td>
                          <td className="pt-3 pb-3">{e.cin} </td>
                          <td className="pt-3 pb-3">{e.Telephon} </td>
                          <td className="pt-3 pb-3">{e.type} </td>
                          <td className="pt-3 pb-3">{e.service} </td>
                          <td className="pt-3 pb-3">{e.Salaire} DH</td>
                          <td className="pt-3 pb-3">
                            <Link
                              to={`/ouvrier/edit/${e.id}`}
                              className="btn btn-success me-3 "
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button
                              className="btn btn-primary me-3 "
                              onClick={() => Show(e.idrecalamtion)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-danger "
                              onClick={() => DeleteUser(e.id)}
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
      {voir ? <Voir voir={voir} setvoir={setvoir} id={id}/> : ""}
      <section className={`confirm ${confirm ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <div className="forms">
              <div className="form login">
                <div className="title"> Supprimer Ouviers</div>
                <form onSubmit={Supperimer}>
                  <p>es-tu sûr?</p>
                  <div className="button">
                    <button>
                      Supprimer Ouviers
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

export default Ouvriers;
