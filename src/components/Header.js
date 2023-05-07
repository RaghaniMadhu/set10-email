import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MailsContext } from "../contexts/MailsContext";

export default function Header() {
  const {
    mails: { emails, spamMails, trashMails },
  } = useContext(MailsContext);

  return (
    <div>
      <ul className="sidebar">
        <li>
          <NavLink to="/" className="navlinks">
            Inbox({emails.length})
          </NavLink>
        </li>
        <li>
          <NavLink to="/spam" className="navlinks">
            Spam({spamMails.length})
          </NavLink>
        </li>
        <li>
          <NavLink to="/trash" className="navlinks">
            Trash({trashMails.length})
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
