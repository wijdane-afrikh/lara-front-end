import axios from "axios";
import React, { useState } from "react";

function Ajouter(props) {
  const [recalamtion, setreclamation] = useState("");
  function Ajouter(e) {
    e.preventDefault();
    let Data = {
      reclamation: recalamtion,
      idUser: localStorage.getItem("idU"),
    };
    axios.post("http://127.0.0.1:8000/api/reclamtion/create", Data).then(() => {
      setreclamation("");
      props.reclamation();
      props.setajouter(false);
    
    });
  }
  return (
    <>
      <section className={`section ${props.ajouter ? "active" : ""}`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user d-flex justify-content-center">
            <div className="forms">
              <div className="form login">
                <div className="title"> Ajouter Reclamtion</div>

                <form onSubmit={Ajouter}>
                  <div className="d-flex">
                    <div className="input-field textarea">
                      <textarea
                        placeholder="Ajouter un Reclamtion"
                        value={recalamtion}
                        onChange={(e) => setreclamation(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="button">
                    <button>
                      Ajouter recalamtion
                      <i className="fa-solid fa-plus ms-3"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => props.setajouter(false)}
                    >
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

export default Ajouter;
