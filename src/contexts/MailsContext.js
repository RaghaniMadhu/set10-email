import { createContext, useReducer } from "react";
import { emails } from "../api/FakeFetch";

export const MailsContext = createContext();

const MailsContextProvider = ({ children }) => {
  const reducerFunction = (mails, action) => {
    switch (action.type) {
      case "STAR_UNSTAR_MAIL": {
        const modifiedEmails = mails[action.payload.from].map((eachMail) =>
          eachMail.mId === action.payload.mId
            ? { ...eachMail, isStarred: !eachMail.isStarred }
            : eachMail
        );
        return { ...mails, [action.payload.from]: modifiedEmails };
      }
      case "READ_UNREAD_MAIL": {
        const modifiedEmails = mails[action.payload.from].map((eachMail) =>
          eachMail.mId === action.payload.mId
            ? { ...eachMail, unread: !eachMail.unread }
            : eachMail
        );
        return { ...mails, [action.payload.from]: modifiedEmails };
      }
      case "MARK_AS_SPAM": {
        const spamMail = mails.emails.find(
          ({ mId }) => mId === action.payload.mId
        );
        const modifiedEmails = mails.emails.filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return {
          ...mails,
          spamMails: [...mails.spamMails, spamMail],
          emails: modifiedEmails,
        };
      }
      case "DELETE_MAIL": {
        const deletedMail = mails.emails.find(
          ({ mId }) => mId === action.payload.mId
        );
        const modifiedEmails = mails.emails.filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return {
          ...mails,
          trashMails: [...mails.trashMails, deletedMail],
          emails: modifiedEmails,
        };
      }
      case "VIEW_DETAILS_OF_MAIL": {
        const mail = mails[action.payload.from].find(
          ({ mId }) => mId === action.payload.mId
        );
        return { ...mails, requiredMail: mail };
      }
      default:
        return mails;
    }
  };

  const [mails, dispatch] = useReducer(reducerFunction, {
    emails,
    spamMails: [],
    trashMails: [],
    requiredMail: {},
  });

  return (
    <>
      <MailsContext.Provider value={{ mails, dispatch }}>
        {children}
      </MailsContext.Provider>
    </>
  );
};

export default MailsContextProvider;
