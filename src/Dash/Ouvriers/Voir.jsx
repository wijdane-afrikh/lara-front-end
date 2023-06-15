import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
function Voir({ voir, setvoir, id }) {
  const [reclamtionU, setreclamation] = useState([]);
  async function fetchReclamation() {
    axios.get("http://127.0.0.1:8000/api/reclamtion").then((res) => {
      setreclamation(res.data);
    });
  }
  useEffect(() => {
    fetchReclamation();
  }, []);
  return (
    <>
      <section className={`confirm ${voir ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user">
            <button
              className="btn btn-danger btn-r"
              onClick={() => setvoir((voir) => !voir)}
            >
              {" "}
              <i className="fa-solid fa-trash"></i>
            </button>
            <div className="forms">
              <div className="form login">
                {reclamtionU
                  .filter((e) => e.idR == id)
                  .map((e, i) => (
                    <div className="box" key={i}>
                      <p>reclamation:</p>
                      <p>{e.reclamation}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Voir;
