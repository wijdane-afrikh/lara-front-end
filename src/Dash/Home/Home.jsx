import React,{useState,useEffect} from "react";
import axios from "axios";
function Home() {
  const [user, setuser] = useState([]);
  const [Facture, setFacture] = useState([]);
  const [reclamation, setreclamation] = useState([]);
  const [immeuble, setimmeuble] = useState([]);
  const [Ouvrier, setOuvrier] = useState([]);
  // user
  const fetchUser = () => {
    axios.get("http://127.0.0.1:8000/api/user").then(res => setuser(res.data))
  }
  useEffect(() => {
    fetchUser();
  }, [])

  // immenble
  const fetchimmenble = () => {
    axios.get("http://127.0.0.1:8000/api/Immeuble").then(res => setimmeuble(res.data))
  }
  useEffect(() => {
    fetchimmenble();
  }, [])

    // Ouvrier
    const fetchOuvrier = () => {
      axios.get("http://127.0.0.1:8000/api/ouvrires").then(res => setOuvrier(res.data))
    }
    useEffect(() => {
      fetchOuvrier();
    }, [])
// facture
const fetchfacture = () => {
  axios.get("http://127.0.0.1:8000/api/facture").then(res => setFacture(res.data))
}
useEffect(() => {
  fetchfacture();
}, [])
// reclamation
const fetchreclamation = () => {
  axios.get("http://127.0.0.1:8000/api/reclamation").then(res => setreclamation(res.data))
}
useEffect(() => {
  fetchreclamation();
}, [])
  return (
    <>
      {" "}
      <div className="Content">
        <div className="General">
          <div className="Box">
            <div className="Icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="Info">
              <p>Total Propriétaire: {user.length}</p>
            </div>
          </div>
          <div className="Box">
            <div className="Icon">
              <i className="fa-solid fa-calculator"></i>
            </div>
            <div className="Info">
              <p>Total Facture: {Facture.length}</p>
            </div>
          </div>
          <div className="Box">
            <div className="Icon">
            <i className="fa-regular fa-file-circle-plus"></i>
            </div>
            <div className="Info">
              <p>Total Reclamation: {reclamation.length}</p>
            </div>
          </div>
          <div className="Box">
            <div className="Icon">
            <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="Info">
              <p>Total Ouvrier: {Ouvrier.length}</p>
            </div>
          </div>
          <div className="Box">
            <div className="Icon">
            <i className="fa-sharp fa-solid fa-building"></i>
           
            </div>
            <div className="Info">
              <p>Total immeuble: {immeuble.length}</p>
            </div>
          </div>
        </div>

   
      </div>
    </>
  );
}

export default Home;
