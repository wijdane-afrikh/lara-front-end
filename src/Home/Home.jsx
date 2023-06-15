import React, { useState } from "react";
import "./Home.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [focus, setfocus] = useState(false);
  const [focusPass, setfocusPss] = useState(false);
  const Blur = (e) => {
    if (e.value === "") {
      setfocus(false);
    }
  };
  const BlurP = (e) => {
    if (e.value === "") {
      setfocusPss(false);
    }
  };
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const nav = useNavigate("");
  const Send = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("http://127.0.0.1:8000/api/user/login", { email, password })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("type", res.data.user[0].type);
          localStorage.setItem("idU", res.data.user[0].id);

          if (res.data.user[0].type === "admin") {
            nav("/admin");
          } else {
            nav("/reclamation/user");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  if (localStorage.getItem("idU")) {
    nav("admin");
  }
  return (
    <section className="body">
      <img className="wave" src={require("./wave.png")} />
      <div className="container">
        <div className="img">
          <img src={require("./bg.png")} />
        </div>
        <div className="login-content">
          <form onSubmit={Send}>
            <img src={require("./profile.png")} />
            <h2 className="title">BIENVENU</h2>
            <div className={`input-div one ${focus ? "focus" : ""}`}>
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>e-mail</h5>
                <input
                  type="text"
                  className="input focus"
                  onFocus={() => setfocus(true)}
                  onBlur={(e) => Blur(e.target)}
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className={`input-div pass ${focusPass ? "focus" : ""}`}>
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Mot de passe</h5>
                <input
                  type="password"
                  className="input focus"
                  onFocus={() => setfocusPss(true)}
                  onBlur={(e) => BlurP(e.target)}
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            {/* <a href="#">Forgot Password?</a> */}
            <input type="submit" className="btn-home" value="Connexion" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
