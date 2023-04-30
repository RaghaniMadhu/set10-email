import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MailsContext } from "../contexts/MailsContext";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : "",
});

export default function Header() {
  const {
    mails: { emails, spamMails, trashMails },
  } = useContext(MailsContext);

  return (
    <nav>
      <NavLink to="/" style={getActiveStyle}>
        Inbox({emails.length})
      </NavLink>{" "}
      ||{" "}
      <NavLink to="/spam" style={getActiveStyle}>
        Spam({spamMails.length})
      </NavLink>{" "}
      ||{" "}
      <NavLink to="/trash" style={getActiveStyle}>
        Trash({trashMails.length})
      </NavLink>
    </nav>
  );
}
