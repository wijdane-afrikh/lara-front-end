import React from "react";
import { Link } from "react-router-dom";
function Nav({ active }) {
  let type = localStorage.getItem("type");
  if (!localStorage.getItem("type")) {
    window.location.pathname = "/";
  }

  return (
    <>
      <div className={`Navigation ${active ? "active" : ""}`}>
        <span className="Items">
          <img src={require("./Logo.png")} width="100px" />
        </span>
        {type === "admin" ? (
          <>
            <Link to="/admin" className="Items mb-3 mt-2">
              <i className="fa-solid fa-dashboard"></i>
              <span>Tableau de Bord</span>
            </Link>
            <Link to="/Immeuble" className="Items mb-3">
              <i className="fa-sharp fa-solid fa-building"></i>
              <span>Immeuble</span>
            </Link>
            <Link to="/user" className="Items mb-3">
              <i className="fa-solid fa-user"></i>
              <span>Propriétaire</span>
            </Link>
            <Link to="/ouvrier" className="Items mb-3">
              <i className="fa-solid fa-briefcase"></i>
              <span>Ouvrier</span>
            </Link>
            <Link to="/facture" className="Items mb-3">
              <i className="fa-solid fa-calculator"></i>
              <span>Facture</span>
            </Link>
            <Link to="/reclamation" className="Items mb-3">
              <i className="fa-regular fa-file-circle-plus"></i>

              <span>Reclamation</span>
            </Link>
          
            <Link to="/Charge" className="Items mb-3">
              <i className="fa-sharp fa-regular fa-money-bill"></i>
              <span>Charge</span>
            </Link>
          </>
        ) : (
          ""
        )}
        {type === "user" ? (
          <>
            <Link to="/reclamation/user" className="Items mt-3">
              <i className="fa-regular fa-file-circle-plus"></i>
              <span> Reclamation</span>
            </Link>
            <Link to="/facture/user" className="Items">
              <i className="fa-solid fa-calculator"></i>
              <span>Facture</span>
            </Link>
            <Link to="/Charger/user" className="Items">
            <i className="fa-sharp fa-regular fa-money-bill"></i>
              <span>Charger</span>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Nav;
