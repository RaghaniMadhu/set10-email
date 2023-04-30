import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

function SpamMails() {
  const {
    mails: { spamMails },
    dispatch,
  } = useContext(MailsContext);

  // TODO: define all the types of actions in dispatch

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MadhuRaghani's Mail Box</h1>
      <div>Filters</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {spamMails.map(({ mId, unread, isStarred, subject, content }) => (
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
                dispatch({ type: "STAR_UNSTAR_MAIL_IN_SPAM", payload: mId });
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
                dispatch({ type: "READ_UNREAD_MAIL_IN_SPAM", payload: mId });
              }}
            >
              Mark as {unread ? "Read" : "Unread"}
            </button>
            <button
              onClick={() => {
                dispatch({ type: "MARK_AS_NOT_SPAM", payload: mId });
              }}
            >
              Report Not Spam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpamMails;
