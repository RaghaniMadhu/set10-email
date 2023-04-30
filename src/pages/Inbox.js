import { useContext } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

export default function Inbox() {
  const {
    mails: { emails, spamMails, trashMails },
    dispatch,
  } = useContext(MailsContext);

  const unReadMailsCount = emails.reduce(
    (acc, { unread }) => (unread ? acc + 1 : acc),
    0
  );

  console.log(spamMails, trashMails);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MadhuRaghani's Mail Box</h1>
      <div>Filters</div>
      <p>Unread: {unReadMailsCount}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {emails.map(({ mId, unread, isStarred, subject, content }) => (
          <div
            key={mId}
            style={{
              border: "1px solid black",
              margin: "5px",
              padding: "3px",
              borderRadius: "5px",
              backgroundColor: unread ? "lightgray" : "",
            }}
          >
            <h3>Subject: {subject}</h3>
            <p>{content}</p>
            <button
              onClick={() => {
                dispatch({ type: "STAR_UNSTAR_MAIL", payload: mId });
              }}
            >
              {isStarred ? "Unstar" : "Star"}
            </button>
            <Link to={"/mail/" + mId}>
              <button
                onClick={() => {
                  dispatch({ type: "VIEW_DETAILS_OF_MAIL", payload: mId });
                }}
              >
                View Details
              </button>
            </Link>
            <button
              onClick={() => {
                dispatch({ type: "DELETE_MAIL", payload: mId });
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                dispatch({ type: "READ_UNREAD_MAIL", payload: mId });
              }}
            >
              Mark as {unread ? "Read" : "Unread"}
            </button>
            <button
              onClick={() => {
                dispatch({ type: "MARK_AS_SPAM", payload: mId });
              }}
            >
              Report Spam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
