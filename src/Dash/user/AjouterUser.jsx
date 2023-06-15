import React, { useState, useEffect } from "react";
import "./User.scss";
import axios from "axios";
import { MdApartment } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
function AjouterUser(props) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [img, setimg] = useState("");
  const [Telephon, setTelephon] = useState("");
  const [Apparetement, setApparetement] = useState("");
  const [showPss, setShowPss] = useState(false);
  const [showCPss, setShowCPss] = useState(false);
  const [IdImmeubles, setIdImmeubles] = useState("");

  const Send = async (e) => {
    e.preventDefault();
    let Data = {
      name,
      email,
      password,
      image: img,
      Telephon,
      Apparetement,
      IdImmeubles,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/create", Data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setApparetement("");
        setCpassword("");
        setname("");
        setemail("");
        setpassword("");
        setimg("");
        setTelephon("");
        setShowPss(false);
        setShowCPss(false);
        props.setajouter(false);
        props.fetchUser();
      })
      .catch((e) => console.log(e));
  };
  // meubel
  const [Immeuble, setImmeuble] = useState([]);
  const fetchImmeuble = () => {
    axios
      .get("http://127.0.0.1:8000/api/Immeuble")
      .then((res) => setImmeuble(res.data));
  };
  useEffect(() => {
    fetchImmeuble();
  }, []);
  return (
    <>
      {" "}
      <section className={`section ${props.ajouter ? "active" : ""}`}>
        <span className="overlay"></span>

        <div className="modal-box">
          <div className="container-user d-flex justify-content-center">
            <div className="forms">
              <div className="form login">
                <div className="title"> Ajouter Propriétaire</div>
                <div className="div mt-3 mb-3">
                  <img
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />

                  <label htmlFor="img">
                    <FiCamera />
                  </label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={(e) => setimg(e.target.files[0])}
                  />
                </div>
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
                        type="email"
                        className="email"
                        placeholder="Entrer votre E-mail"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      <i className="fa-solid fa-envelope icon"></i>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Entrer votre Telephone"
                        required
                        value={Telephon}
                        onChange={(e) => setTelephon(e.target.value)}
                      />
                      <i className="fa-solid fa-phone icon"></i>
                    </div>
                    <div className="input-field">
                      <input
                        type={`${showPss ? "text" : "password"}`}
                        className="password"
                        placeholder="Entrer votre mot de passe"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <i className="fa-solid fa-lock icon"></i>
                      <i
                        className={`${
                          !showPss
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash "
                        } eye`}
                        onClick={() => setShowPss((showPss) => !showPss)}
                      ></i>
                    </div>
                  </div>{" "}
                  <div className="d-flex">
                    <div className="input-field">
                      <input
                        type={`${showCPss ? "text" : "password"}`}
                        className="password"
                        placeholder="confirmer le mot de passe"
                        required
                        value={Cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                      />
                      <i className="fa-solid fa-lock icon"></i>
                      <i
                        className={`${
                          !showCPss
                            ? "fa-solid fa-eye "
                            : "fa-solid fa-eye-slash"
                        } eye`}
                        onClick={() => setShowCPss((showCPss) => !showCPss)}
                      ></i>
                    </div>
                    <div className="input-field select">
                      <input
                        type="number"
                        className="number"
                        placeholder="entrez le numéro de l'appartement"
                        required
                        value={Apparetement}
                        min="1"
                        onChange={(e) => setApparetement(e.target.value)}
                      />
                      <MdApartment className="icon" />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="input-field select">
                      <select onChange={(e) => setIdImmeubles(e.target.value)}>
                        <option value="0">Entrer Immeubles</option>
                       
                        {Immeuble.map((e,i) => (
                          <option value={e.id} key={i}>{e.name}</option>
                        ))}{" "}
                      </select>

                      <i className="fa-solid fa-file-contract icon"></i>
                    </div>
                  </div>
                  <div className="button">
                    <button>
                      Ajouter Propriétaire
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

export default AjouterUser;
