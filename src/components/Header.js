import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MailsContext } from "../contexts/MailsContext";

const getActiveStyle = ({ isActive }) => ({
  fontWeight: isActive ? "600" : "200",
  color: isActive ? "red" : "black",
  textDecoration: "none",
});

export default function Header() {
  const {
    mails: { emails, spamMails, trashMails },
  } = useContext(MailsContext);

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h1 style={{ textAlign: "center" }}>MadhuRaghani's Mail Box</h1>
      </Link>
      <ul className="sidebar">
        <li>
          <NavLink to="/" style={getActiveStyle}>
            Inbox({emails.length})
          </NavLink>
        </li>
        <li>
          <NavLink to="/spam" style={getActiveStyle}>
            Spam({spamMails.length})
          </NavLink>
        </li>
        <li>
          <NavLink to="/trash" style={getActiveStyle}>
            Trash({trashMails.length})
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
