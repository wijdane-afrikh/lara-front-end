import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
function Ajouter(props) {
  const [name, setname] = useState("");
  const [Cin, setCin] = useState("");
  const [Service, setService] = useState("");
  const [Type, setType] = useState("");
  const [Telephon, setTelephon] = useState("");
  const [Salaire, setSalaire] = useState("");
  const [reclamtion, setreclamtion] = useState("");
  const [reclamtionU, setreclamation] = useState([]);
  async function fetchReclamation() {
    axios.get("http://127.0.0.1:8000/api/reclamtion").then((res) => {
      setreclamation(res.data);
    });
  }
  useEffect(() => {
    fetchReclamation();
  }, []);
  const Send = async (e) => {
    e.preventDefault();
    let Data = {
      name,
      Service,
      Cin,
      Type,
      Telephon,
      Salaire,
      reclamtion,
    };
    console.log(Data);
    axios
      .post("http://127.0.0.1:8000/api/ouvrires/create", Data)
      .then((res) => {
        setCin("");
        setType("");
        setService("");
        setname("");
        setTelephon("");
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
                <div className="title"> Ajouter Ouvriers</div>

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
                      <i className="fa-solid fa-user icon"></i>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        className="email"
                        placeholder="Entrer votre Cin"
                        required
                        value={Cin}
                        onChange={(e) => setCin(e.target.value)}
                      />
                      <i className="fa-solid fa-envelope icon"></i>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="input-field">
                      <input
                        type="number"
                        placeholder="Entrer votre Telephone"
                        required
                        value={Telephon}
                        onChange={(e) => setTelephon(e.target.value)}
                      />
                      <i className="fa-solid fa-phone icon"></i>
                    </div>

                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Entrer votre Service"
                        required
                        value={Service}
                        onChange={(e) => setService(e.target.value)}
                      />
                      <i className="fa-solid fa-briefcase icon"></i>
                    </div>
                  </div>{" "}
                  <div className="d-flex">
                    <div className="input-field">
                      <select onChange={(e) => setType(e.target.value)}>
                        <option value="0">Entrer votre type de contrat</option>
                        <option value="Toujour">Toujour</option>
                        <option value="Si_nécessaire">Si nécessaire</option>
                      </select>

                      <i className="fa-solid fa-file-contract icon"></i>
                    </div>
                    <div className="input-field">
                      <input
                        type="number"
                        placeholder="Entrer votre Salaire"
                        required
                        value={Salaire}
                        onChange={(e) => setSalaire(e.target.value)}
                      />
                      <i className="fa-solid fa-money-bill icon"></i>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="input-field">
                      <select onChange={(e) => setreclamtion(e.target.value)}>
                        <option>Choix reclamations</option>;
                        {reclamtionU
                          .filter((e) => e.status === "en cours")
                          .map((e, i) => (
                            <option key={i} value={e.idR}>
                              {e.reclamation}
                            </option>
                          ))}
                      </select>

                      <i className="fa-solid fa-file-contract icon"></i>
                    </div>
                  </div>
                  <div className="button">
                    <button>
                      Ajouter Ouvriers
                      <i className="fa-solid fa-user-plus ms-3"></i>
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
