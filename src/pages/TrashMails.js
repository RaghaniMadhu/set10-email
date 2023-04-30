import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

function TrashMails() {
  const {
    mails: { trashMails },
    dispatch,
  } = useContext(MailsContext);

  // TODO: define all the types of actions in dispatch
  // TODO: Implement filters to show unread emails and to show starred emails with the help of checkbox. Initially these checkboxes should not be selected. in all 3tabs

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
        {trashMails.map(({ mId, unread, isStarred, subject, content }) => (
          <div
            key={mId}
            style={{
              border: "1px solid black",
              margin: "5px",
              padding: "3px",
              borderRadius: "5px",
              backgroundColor: unread ? "" : "lightgray",
            }}
          >
            <h3>Subject: {subject}</h3>
            <p>{content}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "STAR_UNSTAR_MAIL",
                  payload: { mId, from: "trashMails" },
                });
              }}
            >
              {isStarred ? "Unstar" : "Star"}
            </button>
            <Link to={"/mail/" + mId}>
              <button
                onClick={() => {
                  dispatch({
                    type: "VIEW_DETAILS_OF_MAIL",
                    payload: { mId, from: "trashMails" },
                  });
                }}
              >
                View Details
              </button>
            </Link>
            <button
              onClick={() => {
                dispatch({
                  type: "READ_UNREAD_MAIL",
                  payload: { mId, from: "trashMails" },
                });
              }}
            >
              Mark as {unread ? "Read" : "Unread"}
            </button>
            <button
              onClick={() => {
                dispatch({ type: "DELETE_PERMANENTLY", payload: mId });
              }}
            >
              Delete Permanently
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashMails;
