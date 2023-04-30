import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

export default function Inbox() {
  const {
    mails: { emails },
    dispatch,
  } = useContext(MailsContext);

  const unReadMailsCount = emails.reduce(
    (acc, { unread }) => (unread ? acc + 1 : acc),
    0
  );

  const [applyFilters, setApplyFilters] = useState({
    showOnlyUnreadMails: false,
    showOnlyStarredMails: false,
  });

  const unReadMails = applyFilters.showOnlyUnreadMails
    ? emails.filter(({ unread }) => unread)
    : emails;
  const filteredMails = applyFilters.showOnlyStarredMails
    ? unReadMails.filter(({ isStarred }) => isStarred)
    : unReadMails;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MadhuRaghani's Mail Box</h1>
      <div>
        Filters:
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setApplyFilters({
                ...applyFilters,
                showOnlyUnreadMails: event.target.checked,
              });
            }}
          />
          Show Unread Mails
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setApplyFilters({
                ...applyFilters,
                showOnlyStarredMails: event.target.checked,
              });
            }}
          />
          Show Starred Mails
        </label>
      </div>
      <p>Unread: {unReadMailsCount}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {filteredMails.map(({ mId, unread, isStarred, subject, content }) => (
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
                  payload: { mId, from: "emails" },
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
                    payload: { mId, from: "emails" },
                  });
                }}
              >
                View Details
              </button>
            </Link>
            <button
              onClick={() => {
                dispatch({
                  type: "DELETE_MAIL",
                  payload: { mId, from: "emails" },
                });
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "READ_UNREAD_MAIL",
                  payload: { mId, from: "emails" },
                });
              }}
            >
              Mark as {unread ? "Read" : "Unread"}
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "MARK_AS_SPAM",
                  payload: { mId, from: "emails" },
                });
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
