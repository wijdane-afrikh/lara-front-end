import Home from "./Home/Home";
import Dahs from "./Dash/Dahs";
import User from "./Dash/user/User";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Facture from "./Dash/Facture/Facture";
import Reclamation from "./Dash/réclamation/Reclamation";
import Ouvriers from "./Dash/Ouvriers/Ouvriers";
import Immeuble from "./Dash/Immeuble/Immeuble";
import Reclamtion from "./Dash/reclamationUser/Reclamtion";
import FactureUser from "./Dash/FactureUser/FactureUser";
import Edit from "./Dash/Ouvriers/Edit";
import EditI from "./Dash/Immeuble/EditI";
import Charge from "./Dash/Charge/Charge";
import ChargeUser from "./Dash/ChargeUser/ChargeUser";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dahs />} />
          <Route path="/user" element={<User />} />
          <Route path="/facture" element={<Facture />} />
          <Route path="/reclamation" element={<Reclamation />} />

          <Route path="/ouvrier" element={<Ouvriers />} />
          <Route path="/ouvrier/edit/:id" element={<Edit />} />
          <Route path="/Immeuble" element={<Immeuble />} />
          <Route path="/Immeuble/:id" element={<EditI />} />

          <Route path="/reclamation/user" element={<Reclamtion />} />
          <Route path="/facture/user" element={<FactureUser />} />
          <Route path="/Charge" element={<Charge />} />
          <Route path="/Charger/user" element={<ChargeUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
