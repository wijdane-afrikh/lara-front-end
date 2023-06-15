import React from "react";
import Nav from "../Nav/Nav";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import Ajouter from "./Ajouter";
import { Link } from "react-router-dom";

function Immeuble() {
  const [active, setactive] = useState(false);
  const [ajouter, setajouter] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/Immeuble")
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
      .post("http://127.0.0.1:8000/api/Immeuble/delete/" + id)
      .then(() => {
        setconfirm(false);
        fetchUser();
      })
      .catch((e) => console.log(e));
  }
  // edit
 
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
                  <h2>Tableau Immeuble</h2>
                  <button className="btn-dash" onClick={() => setajouter(true)}>
                    Ajouter Immeuble <i className="fa-solid fas-user"></i>
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th> Nom </th>
                        <th>Adress </th>
                        <th>Nombre d'étages</th>
                    
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((e, i) => (
                        <tr key={i}>
                          <td className="pt-3 pb-3"> {e.name} </td>
                          <td className="pt-3 pb-3">{e.adress} </td>
                          <td className="pt-3 pb-3">{e.Total_etage} </td>
                     
                          <td className="pt-3 pb-3">
                            <Link to={`/Immeuble/${e.id}`}
                              className="btn btn-success me-3 "                              
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
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
      <section className={`confirm ${confirm ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <div className="forms">
              <div className="form login">
                <div className="title"> Supprimer Immeuble</div>
                <form onSubmit={Supperimer}>
                  <p>es-tu sûr?</p>
                  <div className="button">
                    <button>
                      Supprimer Immeuble
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
export default Immeuble;
