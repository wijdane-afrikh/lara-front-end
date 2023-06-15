import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
function ChargeUser() {
  const [active, setactive] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [user, setuser] = useState([]);
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
      .post("http://127.0.0.1:8000/api/user/delete/" + id)
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
    axios
      .post("http://127.0.0.1:8000/api/Charge/create", { user })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
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
                    <h2>Les Charges</h2>
                  
                  </div>
                  <div className="box-container mt-3">
                  {user.filter(e=>e.user===parseInt(localStorage.getItem("idU")))
                    .map((e, i) => (
                      <div className="box" key={i}>
                
                        <p>Mois:  {Moins(new Date(e.date).getMonth())}{" "}</p>
                        <span className={`btn ${e.Stauts!=="Non payé"?"btn-warning":"btn-info"}`}>
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
export default ChargeUser;
