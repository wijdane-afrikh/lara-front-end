import { useState } from "react";
import { MdApartment } from "react-icons/md";
import React from "react";
import axios from "axios";
function Ajouter(props) {
  const [name, setname] = useState("");
  const [adress, setadress] = useState("");
  const [Total_etage, setTotal_etage] = useState("");

  const Send = async (e) => {
    e.preventDefault();
    let Data = {
      name,
      Total_etage,
      adress,
   
    };
    axios
      .post("http://127.0.0.1:8000/api/Immeuble/create", Data)
      .then(() => {
        setadress("");
        setTotal_etage("");
        setname("");
     
        props.setajouter(false);
        props.fetchUser();
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {" "}
      <section className={`section ${props.ajouter ? "active" : ""}`}>
        <span className="overlay"></span>

        <div className="modal-box">
          <div className="container-user d-flex justify-content-center">
            <div className="forms">
              <div className="form login">
                <div className="title"> Ajouter Immeuble</div>

                <form onSubmit={Send}>
                  <div className="d-flex justify-content-between">
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Entrer votre Nom"
                        required
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                     <i className="fa-sharp fa-solid fa-building icon"></i>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        className="email"
                        placeholder="Entrer votre adress"
                        required
                        value={adress}
                        onChange={(e) => setadress(e.target.value)}
                      />
                   <i className="fa-solid fa-location-dot icon"></i>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="input-field select">
                      <input
                        type="number"
                        placeholder="Entrer votre Nombre d'étages"
                        required
                        value={Total_etage}
                        onChange={(e) => setTotal_etage(e.target.value)}
                      />
                     <i className="fa-solid fa-list-ol icon"></i>
                    </div>

                   
                  </div>{" "}
                
                  <div className="button">
                    <button>
                      Ajouter Immeuble
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
