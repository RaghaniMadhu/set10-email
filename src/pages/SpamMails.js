import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { MailsContext } from "../contexts/MailsContext";

function SpamMails() {
  const {
    mails: { spamMails },
    dispatch,
  } = useContext(MailsContext);

  const [applyFilters, setApplyFilters] = useState({
    showOnlyUnreadMails: false,
    showOnlyStarredMails: false,
  });

  const unReadMails = applyFilters.showOnlyUnreadMails
    ? spamMails.filter(({ unread }) => unread)
    : spamMails;
  const filteredMails = applyFilters.showOnlyStarredMails
    ? unReadMails.filter(({ isStarred }) => isStarred)
    : unReadMails;

  return (
    <div className="page-div">
      {spamMails.length === 0 ? (
        <h3 className="no-mails-heading">Hooray, no spam here!</h3>
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
          <div>
            {filteredMails.map(
              ({ mId, unread, isStarred, subject, content }) => (
                <div
                  key={mId}
                  className="mail"
                  style={{ backgroundColor: unread || "lightgray" }}
                >
                  <div className="subject-and-buttons-div">
                    <h3 style={{ marginBlockStart: "0rem" }}>
                      Subject: {subject}
                    </h3>
                    <div className="buttons-div">
                      <button
                        className="star-delete-read-buttons"
                        style={{ right: "25px" }}
                        onClick={() => {
                          dispatch({
                            type: "STAR_UNSTAR_MAIL",
                            payload: { mId, from: "spamMails" },
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
                            payload: { mId, from: "spamMails" },
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
                            type: "DELETE_MAIL",
                            payload: { mId, from: "spamMails" },
                          });
                        }}
                      >
                        <box-icon name="trash"></box-icon>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="content-p">{content}</p>
                    <div className="details-and-a-button">
                      <Link to={"/mail/" + mId}>
                        <button
                          onClick={() => {
                            dispatch({
                              type: "VIEW_DETAILS_OF_MAIL",
                              payload: { mId, from: "spamMails" },
                            });
                          }}
                        >
                          View Details
                        </button>
                      </Link>
                      <button
                        className="star-delete-read-buttons"
                        onClick={() => {
                          dispatch({
                            type: "MARK_AS_NOT_SPAM",
                            payload: { mId },
                          });
                        }}
                      >
                        Report Not Spam
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpamMails;
