import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
function Charge() {
  const [active, setactive] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
  const [users, setusers] = useState([]);
  const fetch = () => {
    axios
      .get("http://127.0.0.1:8000/api/user")
      .then((res) => setusers(res.data));
  };
  useEffect(() => {
    fetch();
  }, []);
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/Charge")
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
      .post("http://127.0.0.1:8000/api/Charge/delete/" + id)
      .then(() => {
        setconfirm(false);
        fetchUser();
      })
      .catch((e) => console.log(e));
  }
  let moin = [
    { id: 1, moin: "Janvier" },
    { id: 2, moin: "Février" },
    { id: 3, moin: "Mars" },
    { id: 4, moin: "Avril" },
    { id: 5, moin: "Mai" },
    { id: 6, moin: "Juin" },
    { id: 7, moin: "Juillet" },
    { id: 8, moin: "Août" },
    { id: 9, moin: "Septembre" },
    { id: 10, moin: "Octobre" },
    { id: 11, moin: "Novembre" },
    { id: 12, moin: "Décembre" },
  ];

  // create
  function create(e) {
    e.preventDefault();
    let a = false;
    if (user.length > 0) {
      for (let index = 0; index < user.length; index++) {
        console.log();
        if (
          new Date(user[index]["date"]).getMonth() !== new Date().getMonth() &&
          new Date().getFullYear() !==
            new Date(user[index]["date"]).getFullYear()
        ) {
          a = true;
        }
      }
    } else {
      a = true;
    }
    let x = users.filter((e) => e.type !== "admin");
    if (a) {
      axios
        .post("http://127.0.0.1:8000/api/Charge/create", { users:x })
        .then(() => {
          fetchUser();
        })
        .catch((e) => console.log(e));
    }
    if (!a) {
      alert("le mois deja ajouter");
    }
  

  }
  function Moins(mois) {
    switch (mois) {
      case 0:
        return "Janvier";
        break;

      case 1:
        return "Février";
        break;
      case 2:
        return "Mars";
        break;
      case 3:
        return "Avril";
        break;
      case 4:
        return "Mai";
        break;
      case 5:
        return "Juin";
        break;
      case 6:
        return "Juillet";
        break;
      case 7:
        return "Août";
        break;
      case 8:
        return "Septembre";
        break;
      case 9:
        return "Octobre";
        break;
      case 10:
        return "Novembre";
        break;
      case 11:
        return "Décembre";
        break;
    }
  }
  const [M, setM] = useState(0);
  function update(s, st) {
    axios
      .post("http://127.0.0.1:8000/api/Charge/update/" + s, { status: st })
      .then(() => {
        fetchUser();
      })
      .catch((e) => console.log(e));
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
                <div className="cardHeader d-flex">
                  <h2 className="mb-3">Tableau Charge</h2>
                  <form className="d-flex" onSubmit={create}>
                    <button className="btn btn-primary me-3">
                      Ajouter les charge
                    </button>
                    <select
                      name=""
                      id=""
                      onChange={(e) => setM(e.target.value)}
                    >
                      <option value="">choisis le moins</option>
                      {moin.map((e, i) => (
                        <option value={e.id} key={i}>
                          {e.moin}
                        </option>
                      ))}
                    </select>{" "}
                  </form>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th> Nom </th>
                        <th>Moins </th>
                        <th>Status</th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {M > 0
                        ? user
                            .filter((e) => new Date(e.date).getMonth() + 1 == M)
                            .map((e, i) => (
                              <tr key={i}>
                                <td className="pt-3 pb-3">
                                  <img
                                    width="50px"
                                    src={`http://127.0.0.1:8000/User/${e.image}`}
                                  />{" "}
                                  {e.name}{" "}
                                </td>

                                <td className="pt-3 pb-3">
                                  {Moins(new Date(e.date).getMonth())}{" "}
                                </td>
                                <td>
                                  {e.Stauts === "Non paye" ? (
                                    <span
                                      onClick={() => update(e.idR, " paye")}
                                      className={`btn  btn-warning`}
                                    >
                                      {e.Stauts}
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() => update(e.idR, "Non paye")}
                                      className={`btn btn-info`}
                                    >
                                      {e.Stauts}
                                    </span>
                                  )}
                                </td>

                                <td className="pt-3 pb-3">
                                  <button
                                    className="btn btn-danger "
                                    onClick={() => DeleteUser(e.idR)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                        : user.map((e, i) => (
                            <tr key={i}>
                              <td className="pt-3 pb-3">
                                <img
                                  width="50px"
                                  src={`http://127.0.0.1:8000/User/${e.image}`}
                                />{" "}
                                {e.name}{" "}
                              </td>

                              <td className="pt-3 pb-3">
                                {Moins(new Date(e.date).getMonth())}{" "}
                              </td>
                              <td>
                                {e.Stauts === "Non paye" ? (
                                  <span
                                    onClick={() => update(e.idR, " paye")}
                                    className={`btn  btn-warning`}
                                  >
                                    {e.Stauts}
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => update(e.idR, "Non paye")}
                                    className={`btn btn-info`}
                                  >
                                    {e.Stauts}
                                  </span>
                                )}
                              </td>
                              <td className="pt-3 pb-3">
                                <button
                                  className="btn btn-danger "
                                  onClick={() => DeleteUser(e.idR)}
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
      <section className={`confirm ${confirm ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <div className="forms">
              <div className="form login">
                <div className="title"> Supprimer Charge</div>
                <form onSubmit={Supperimer}>
                  <p>es-tu sûr?</p>
                  <div className="button">
                    <button>
                      Supprimer Utilisateur
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
export default Charge;
