import "./styles.css";

import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";

import Inbox from "./pages/Inbox";
import Mail from "./pages/Mail";
import TrashMails from "./pages/TrashMails";
import SpamMails from "./pages/SpamMails";

export default function App() {
  return (
    <div className="App">
      <Link to="/" className="mailBoxHeader">
        <h1>MadhuRaghani's Mail Box</h1>
      </Link>
      <div className="mainApp">
        <Header />
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/spam" element={<SpamMails />} />
          <Route path="/trash" element={<TrashMails />} />
          <Route path="/mail/:mailId" element={<Mail />} />
        </Routes>
      </div>
    </div>
  );
}
