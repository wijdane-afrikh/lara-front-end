import { useState, useEffect } from "react";
import { MdApartment } from "react-icons/md";
import React from "react";
import axios from "axios";
function Ajouter(props) {
  const [Cin, setCin] = useState("");

  const [Telephon, setTelephon] = useState("");
  const [user, setuser] = useState([]);
  // user
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/user")
      .then((res) => setuser(res.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const Send = async (e) => {
    e.preventDefault();
    let x = user.filter((e) => e.type !== "admin");
    let Data = {
      user: x,
      Cin,
      Telephon,
    };
    axios
      .post("http://127.0.0.1:8000/api/facture/create", Data)
      .then((res) => {
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
                <div className="title"> Ajouter Facture</div>

                <form onSubmit={Send}>
                  <div className="d-flex justify-content-between">
                    <div className="input-field">
                      <input
                        type="text"
                        className="number"
                        placeholder="Entrer votre Total facture"
                        required
                        value={Cin}
                        onChange={(e) => setCin(e.target.value)}
                      />
                      <i className="fa-regular fa-list-ol icon"></i>
                    </div>

                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Entrer votre raison"
                        required
                        value={Telephon}
                        onChange={(e) => setTelephon(e.target.value)}
                      />
                      <i className="fa-solid fa-file-lines icon"></i>
                    </div>
                  </div>{" "}
                  <div className="d-flex"></div>
                  <div className="button">
                    <button>
                      Ajouter Facture
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
