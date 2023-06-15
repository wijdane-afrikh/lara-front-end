import React, { useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EditI() {
  const { id } = useParams();
  const [editname, editsetname] = useState("");
  const [editadress, seteditadress] = useState("");
  const [editTotal_etage, seteditTotal_etage] = useState("");

  // show
  function Show() {
    axios.get("http://127.0.0.1:8000/api/Immeuble/show/" + id).then((res) => {
      editsetname(res.data.name);
      seteditadress(res.data.adress);
      seteditTotal_etage(res.data.Total_etage);
    });
  }

  useEffect(() => {
    Show();
  }, []);

  const Modifier = async (e) => {
    e.preventDefault();
    let Data = {
      name: editname,
      adress: editadress,
      Total_etage: editTotal_etage,
    };
    await axios
      .post("http://127.0.0.1:8000/api/Immeuble/update/" + id, Data)
      .then(() => {
        
        window.location.pathname = "/Immeuble";
      })
      .catch((e) => console.log(e));
  };
  const nav=useNavigate("");
  const Annuler=()=>{
  nav("/Immeuble")
  }
 
  return (
    <>
      {" "}
      <section className={`section  active`}>
        <span className="overlay"></span>
        <div className="modal-box">
          <div className="container-user d-flex justify-content-center">
            <div className="forms">
              <div className="form login">
                <div className="title"> Modifier Immeuble</div>
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
                      <i className="fa-sharp fa-solid fa-building icon"></i>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        className="email"
                        placeholder="Entrer votre adress"
                        required
                        value={editadress}
                        onChange={(e) => seteditadress(e.target.value)}
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
                        value={editTotal_etage}
                        onChange={(e) => seteditTotal_etage(e.target.value)}
                      />
                      <i className="fa-solid fa-list-ol icon"></i>
                    </div>
                  </div>{" "}
                  <div className="button">
                    <button>
                      Modifier Immeuble
                      <i className="fa-solid fa-pen-to-square ms-3"></i>
                    </button>
                    <button type="button" onClick={() => Annuler()}>
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

export default EditI;
