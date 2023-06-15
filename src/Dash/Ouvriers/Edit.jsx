
import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
function Edit() {
  const [editname, editsetname] = useState("");
  const [editservice, seteditservice] = useState("");
  const [edittype, setedittype] = useState("");
  const [editcin, seteditcin] = useState("");
  const [editSalaire, seteditSalire] = useState("");
  const [editTelephon, seteditTelephon] = useState("");
  const { id } = useParams();
  const [reclamtionU, setreclamation] = useState([]);
  async function fetchReclamation() {
    axios.get("http://127.0.0.1:8000/api/reclamtion").then((res) => {
      setreclamation(res.data);
    });
  }
  useEffect(() => {
    fetchReclamation();
  }, []);
  // show
  const Show = () => {
    axios.get("http://127.0.0.1:8000/api/ouvrires/show/" + id).then((res) => {
      editsetname(res.data.name);
      seteditSalire(res.data.Salaire);
      seteditservice(res.data.service);
      setedittype(res.data.type);
      seteditcin(res.data.cin);
      seteditTelephon(res.data.Telephon);
    });
  };
  useEffect(() => {
    Show();
  }, []);

  const Modifier = async (e) => {
    e.preventDefault();
    let Data = {
      name: editname,
      Service: editservice,
      Cin: editcin,
      Type: edittype,
      Telephon: editTelephon,Salaire:editSalaire
    };
    axios
      .post("http://127.0.0.1:8000/api/ouvrires/update/" + id, Data)
      .then(() => {window.location.pathname="/ouvrier"})
      .catch((e) => console.log(e));
  };
  const nav=useNavigate("");
const Annuler=()=>{
nav("/ouvrier")
}

  return (
    <>
      <main>
        <div className={`Main  active`}>
          <div className="home-content ps-3">
            <section className={`section active`}>
              <div className="modal-box">
                <div className="container-user d-flex justify-content-center">
                  <div className="forms">
                    <div className="form login">
                      <div className="title"> Modifier Ouvriers</div>

                      <form onSubmit={Modifier}>
                        <div className="d-flex justify-content-between">
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Entrer votre Nom"
                              required
                              value={editname}
                              onChange={(e) => editsetname(e.target.value)}
                            />
                            <i className="fa-solid fa-user icon"></i>
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Entrer votre Cin"
                              required
                              value={editcin}
                              onChange={(e) => seteditcin(e.target.value)}
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
                              value={editTelephon}
                              onChange={(e) => seteditTelephon(e.target.value)}
                            />
                            <i className="fa-solid fa-phone icon"></i>
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Entrer votre Service"
                              required
                              value={editservice}
                              onChange={(e) => seteditservice(e.target.value)}
                            />
                            <i className="fa-solid fa-briefcase icon"></i>
                          </div>
                        </div>{" "}
                        <div className="d-flex">
                          <div className="input-field">
                            <select
                              onChange={(e) => setedittype(e.target.value)}
                            >
                              <option value="0">
                                Entrer votre type de contrat
                              </option>
                              <option value="Toujour">Toujour</option>
                              <option value="Si_nécessaire">
                                Si nécessaire
                              </option>
                            </select>
                            <i className="fa-solid fa-file-contract icon"></i>
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Entrer votre Service"
                              required
                              value={editSalaire}
                              onChange={(e) => seteditSalire(e.target.value)}
                            />
                            <i className="fa-solid fa-money-bill icon"></i>
                          </div>
                        </div>
                        <div className="d-flex">
                    <div className="input-field">
                      <select>
                        <option value="0">Choix reclamations</option>;
                        {reclamtionU
                          .filter((e) => e.status === "en cours")
                          .map((e) => (
                            <option value={e.idR}>{e.reclamation}</option>
                          ))}
                      </select>

                      <i className="fa-solid fa-file-contract icon"></i>
                    </div>
                  </div>
                        <div className="button">
                          <button>
                            Modifier Ouvriers
                            <i class="fa-solid fa-pen-to-square ms-3"></i>
                          </button>

                        
                            <button type="button" onClick={()=>Annuler()}>
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
          </div>
        </div>
      </main>
    </>
  );
}

export default Edit;
