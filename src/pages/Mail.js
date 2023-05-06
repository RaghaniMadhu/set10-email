import React, { useContext } from "react";
import { MailsContext } from "../contexts/MailsContext";

function Mail() {
  const {
    mails: { requiredMail },
    dispatch,
  } = useContext(MailsContext);

  return (
    <div>
      <div
        className="boxes mail"
        style={{ backgroundColor: requiredMail.unread || "lightgray" }}
      >
        <button
          className="star-delete-read-buttons"
          style={{ right: "25px" }}
          onClick={() => {
            dispatch({
              type: "STAR_UNSTAR_IND_MAIL",
              payload: { mId: requiredMail?.mId, from: "emails" },
            });
          }}
        >
          {/* Star/Unstar */}
          {requiredMail?.isStarred ? (
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
              type: "READ_UNREAD_IND_MAIL",
              payload: { mId: requiredMail?.mId, from: "emails" },
            });
          }}
        >
          {/* Mark as Read/Unread */}
          {requiredMail?.unread ? (
            <box-icon name="envelope"></box-icon>
          ) : (
            <box-icon name="envelope-open"></box-icon>
          )}
        </button>
        <h3>Subject: {requiredMail?.subject}</h3>
        <p>{requiredMail?.content}</p>
      </div>
    </div>
  );
}

export default Mail;
