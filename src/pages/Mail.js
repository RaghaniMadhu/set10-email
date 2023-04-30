import React, { useContext } from "react";
import { MailsContext } from "../contexts/MailsContext";

function Mail() {
  const {
    mails: { requiredMail },
  } = useContext(MailsContext);

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          margin: "5px",
          padding: "3px",
          borderRadius: "5px",
          backgroundColor: requiredMail.unread ? "" : "lightgray",
        }}
      >
        <h3>Subject: {requiredMail?.subject}</h3>
        <p>{requiredMail?.content}</p>
      </div>
    </div>
  );
}

export default Mail;
