import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "boxicons";

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
    <div className="boxes">
      {emails.length === 0 ? (
        <h3 className="no-mails-heading">No Conversations in Inbox.</h3>
      ) : (
        <div>
          <fieldset>
            <legend>Filters:</legend>
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
          </fieldset>
          <h4>Unread: {unReadMailsCount}</h4>
          <div className="email-box">
            {filteredMails.map(
              ({ mId, unread, isStarred, subject, content }) => (
                <div
                  key={mId}
                  className="mail"
                  style={{ backgroundColor: unread || "lightgray" }}
                >
                  <button
                    className="star-delete-read-buttons"
                    style={{ right: "25px" }}
                    onClick={() => {
                      dispatch({
                        type: "STAR_UNSTAR_MAIL",
                        payload: { mId, from: "emails" },
                      });
                    }}
                  >
                    {/* Star/Unstar */}
                    {isStarred ? (
                      <box-icon name="star" type="solid"></box-icon>
                    ) : (
                      <box-icon name="star" type="regular"></box-icon>
                    )}
                  </button>
                  <button
                    className="star-delete-read-buttons"
                    style={{ right: "75px" }}
                    onClick={() => {
                      dispatch({
                        type: "READ_UNREAD_MAIL",
                        payload: { mId, from: "emails" },
                      });
                    }}
                  >
                    {/* Mark as Read/Unread */}
                    {unread ? (
                      <box-icon name="envelope"></box-icon>
                    ) : (
                      <box-icon name="envelope-open"></box-icon>
                    )}
                  </button>
                  <button
                    className="star-delete-read-buttons"
                    style={{ right: "125px" }}
                    onClick={() => {
                      dispatch({
                        type: "DELETE_MAIL",
                        payload: { mId, from: "emails" },
                      });
                    }}
                  >
                    {/* Delete */}
                    <box-icon name="trash"></box-icon>
                  </button>
                  <button
                    style={{ position: "absolute", right: "175px" }}
                    onClick={() => {
                      dispatch({
                        type: "MARK_AS_SPAM",
                        payload: { mId, from: "emails" },
                      });
                    }}
                  >
                    {/* Report Spam */}
                    <box-icon name="error-alt"></box-icon>
                  </button>
                  <h3 style={{ marginBlockStart: "0rem" }}>
                    Subject: {subject}
                  </h3>
                  <p>{content}</p>
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
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
