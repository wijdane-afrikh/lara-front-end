import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoChevronRight } from "react-icons/go";
import { MdApartment } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function Header({ setactive }) {
  const [profile, setprofile] = useState(false);
  const [edit, setedit] = useState(false);
  window.onscroll = () => {
    setprofile(false);
  };
  const [user, setuser] = useState([]);
  const fetchUser = () => {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => setuser(res.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const nav = useNavigate("");
  function lougout() {
    localStorage.removeItem("type");
    localStorage.removeItem("iduser");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("Telephon");
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    localStorage.removeItem("idU");
    nav("/");
  }

  // edit

  const [editname, editsetname] = useState("");
  const [editemail, seteditemail] = useState("");
  const [epassword, setepassword] = useState("");
  const [editpassword, seteditpassword] = useState("");
  const [editCpassword, seteditCpassword] = useState("");
  const [editimg, seteditimg] = useState("");
  const [editTelephon, seteditTelephon] = useState("");
  const [editApparetement, seteditApparetement] = useState("");
  const [showPss, setShowPss] = useState(false);
  const [showCPss, setShowCPss] = useState(false);

  // update
  const Modifier = async (e) => {
    e.preventDefault();
    let Data = {
      name: editname,
      email: editemail,
      password: editpassword,
      image: editimg,
      Telephon: editTelephon,
      Apparetement: editApparetement,
    };
    axios
      .post(
        "http://127.0.0.1:8000/api/user/update/" + localStorage.getItem("idU"),
        Data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setedit(false);
        fetchUser();
      })
      .catch((e) => console.log(e));
  };
  // show edit
  const [passowrd, setpassword] = useState("");
  function showedit(name, email, image, tele) {
    seteditemail(email);
    editsetname(name);
    seteditTelephon(tele);
    setpassword(image);
    setedit(true);
  }
  console.log(
    user.filter((e) => e.idU == parseInt(localStorage.getItem("idU")))
  );
  return (
    <>
      <div className="Topbar">
        <div className="Gadget">
          <div
            className="fa-solid fa-bars Toggle"
            style={{ cursor: "pointer" }}
            onClick={() => setactive((active) => !active)}
          ></div>

          <div className="Profil">
            {user
              .filter((e) => e.id == parseInt(localStorage.getItem("idU")))
              .map((e, i) => (
                <div key={i}>
                  {" "}
                  <div
                    className="Profil__img"
                    onClick={() => setprofile((profile) => !profile)}
                  >
                    {e.image ? (
                      <img src={`http://127.0.0.1:8000/User/${e.image}`} />
                    ) : (
                      <img src={require("./profile.png")} />
                    )}
                  </div>
                  <div className={`menu-profile ${profile ? "open" : ""}`}>
                    <div className="sub-menu">
                      <div className="user-info">
                        {e.image ? (
                          <img src={`http://127.0.0.1:8000/User/${e.image}`} />
                        ) : (
                          <img src={require("./profile.png")} />
                        )}
                        <h2>{e.name}</h2>
                      </div>
                      <hr />
                      <div className="sub-menu-link">
                        {e.image ? (
                          <img src={`http://127.0.0.1:8000/User/${e.image}`} />
                        ) : (
                          <img src={require("./profile.png")} />
                        )}
                        <span
                          className="span"
                          onClick={() =>
                            showedit(e.name, e.email, e.passowrd, e.Telephon)
                          }
                        >
                          edit Profile
                        </span>
                        <span className="icon">
                          <GoChevronRight />
                        </span>
                      </div>

                      <div className="sub-menu-link">
                        {e.image ? (
                          <img src={`http://127.0.0.1:8000/User/${e.image}`} />
                        ) : (
                          <img src={require("./profile.png")} />
                        )}
                        <span className="span" onClick={() => lougout()}>
                          {" "}
                          Se déconnecter
                        </span>
                        <span className="icon">
                          {" "}
                          <GoChevronRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* edit profile */}
        <section className={`section ${edit ? "active" : ""}`}>
          <span className="overlay"></span>
          <div className="modal-box">
            <div className="container-user d-flex justify-content-center">
              <div className="forms">
                <div className="form login">
                  <div className="title"> Modifier profile</div>

                  <div className="div mt-3 mb-3">
                    <img
                      src={
                        editimg
                          ? URL.createObjectURL(editimg)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                    />

                    <label htmlFor="editImg">
                      <FiCamera />
                    </label>
                    <input
                      type="file"
                      name="editImg"
                      id="editImg"
                      onChange={(e) => seteditimg(e.target.files[0])}
                    />
                  </div>
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
                          type="email"
                          className="email"
                          placeholder="Entrer votre E-mail"
                          required
                          value={editemail}
                          onChange={(e) => seteditemail(e.target.value)}
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
                          value={editTelephon}
                          onChange={(e) => seteditTelephon(e.target.value)}
                        />
                        <i className="fa-solid fa-phone icon"></i>
                      </div>
                      <div className="input-field">
                        <input
                          type={`${showPss ? "text" : "password"}`}
                          className="password"
                          placeholder="Entrer votre mot de passe"
                          required
                          onChange={(e) => setepassword(e.target.value)}
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
                          placeholder=" Entrer nouveau mot de passe"
                          required
                          value={editpassword}
                          onChange={(e) => seteditpassword(e.target.value)}
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
                      <div className="input-field">
                        <input
                          type={`${showCPss ? "text" : "password"}`}
                          className="password"
                          placeholder="confirmer nouveau mot de passe"
                          required
                          value={editCpassword}
                          onChange={(e) => seteditCpassword(e.target.value)}
                        />
                        <i className="fa-solid fa-lock icon"></i>
                        <i className="fa-solid fa-eye "></i>
                      </div>
                    </div>
                    <div className="button">
                      <button>
                        Modifier Utilisateur
                        <i className="fa-solid fa-pen-to-square ms-3"></i>
                      </button>
                      <button type="button" onClick={() => setedit(false)}>
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
    </>
  );
}

export default Header;
