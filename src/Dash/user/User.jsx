import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Header from "../Header/Header";
import AjouterUser from "./AjouterUser";
import axios from "axios";
function User() {
  const [active, setactive] = useState(false);
  const [ajouter, setajouter] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
  const fetchUser = () => {
    axios.get("http://127.0.0.1:8000/api/user").then(res => setuser(res.data))
  }
  useEffect(() => {
    fetchUser();
  }, [])
  // delete
  const [id, setid] = useState(0);
  function DeleteUser(id) {
    setconfirm(true);
    setid(id)
  }
  function Supperimer(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/user/delete/" + id).
      then(() => {
        setconfirm(false)
        fetchUser();
      }).catch(e => console.log(e))
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
                  <h2>Tableau Propriétaire</h2>
                  <button className="btn-dash" onClick={() => setajouter(true)}>
                    Ajouter Propriétaire <i className="fa-solid fas-user"></i>
                  </button>
                </div>
                <div className="table-responsive">
                  <table >
                    <thead>
                      <tr>
                        <th> Nom </th>
                        <th>E-mail </th>
                        <th>Numero </th>
                        <th>Type </th>
                        <th>appartement </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        user.filter((i) => (i.type !== "admin")).map((e, i) => (
                          <tr key={i} >
                            <td className="pt-3 pb-3"><img width="50px" src={`http://127.0.0.1:8000/User/${e.image}`} /> {e.name} </td>
                            <td className="pt-3 pb-3">{e.email} </td>
                            <td className="pt-3 pb-3">{e.Telephon} </td>
                            <td className="pt-3 pb-3">{e.type} </td>
                            <td className="pt-3 pb-3">{e.idP} </td>
                            <td className="pt-3 pb-3">
                            <button className="btn btn-danger " onClick={() => DeleteUser(e.id)} ><i className="fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        ))
                      }


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AjouterUser ajouter={ajouter} setajouter={setajouter} fetchUser={fetchUser} />
      <section className={`confirm ${confirm ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <div className="forms">
              <div className="form login">
                <div className="title"> Supprimer propriétaire</div>
                <form onSubmit={Supperimer}>
                  <p>es-tu sûr?</p>
                  <div className="button">

                    <button>
                      Supprimer propriétaire
                      <i className="fa-solid fa-trash ms-3"></i>
                    </button>
                    <button type="button" onClick={() => setconfirm(false)}>
                      Annuler
                      <i className="fa-solid fa-circle-xmark ms-3" ></i>
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

export default User;
