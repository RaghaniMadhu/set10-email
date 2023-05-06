import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

function TrashMails() {
  const {
    mails: { trashMails },
    dispatch,
  } = useContext(MailsContext);

  const [applyFilters, setApplyFilters] = useState({
    showOnlyUnreadMails: false,
    showOnlyStarredMails: false,
  });

  const unReadMails = applyFilters.showOnlyUnreadMails
    ? trashMails.filter(({ unread }) => unread)
    : trashMails;
  const filteredMails = applyFilters.showOnlyStarredMails
    ? unReadMails.filter(({ isStarred }) => isStarred)
    : unReadMails;

  return (
    <div className="boxes">
      {trashMails.length === 0 ? (
        <h3 className="no-mails-heading">No Conversations in Trash.</h3>
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
                        payload: { mId, from: "trashMails" },
                      });
                    }}
                  >
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
                        payload: { mId, from: "trashMails" },
                      });
                    }}
                  >
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
                        type: "RESTORE_DELETED_MAIL",
                        payload: { mId },
                      });
                    }}
                  >
                    <box-icon name="undo"></box-icon>
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
                          payload: { mId, from: "trashMails" },
                        });
                      }}
                    >
                      View Details
                    </button>
                  </Link>
                  <button
                    className="star-delete-read-buttons"
                    style={{ right: "25px" }}
                    onClick={() => {
                      dispatch({
                        type: "DELETE_PERMANENTLY",
                        payload: { mId },
                      });
                    }}
                  >
                    Delete Permanently
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrashMails;
