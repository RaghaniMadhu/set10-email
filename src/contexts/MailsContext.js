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
      case "STAR_UNSTAR_IND_MAIL": {
        const modifiedEmails = mails[mails.requiredMailFrom].map((eachMail) =>
          eachMail.mId === action.payload.mId
            ? { ...eachMail, isStarred: !eachMail.isStarred }
            : eachMail
        );
        const mail = modifiedEmails.find(
          ({ mId }) => mId === action.payload.mId
        );
        return {
          ...mails,
          requiredMail: mail,
          [mails.requiredMailFrom]: modifiedEmails,
        };
      }
      case "READ_UNREAD_MAIL": {
        const modifiedEmails = mails[action.payload.from].map((eachMail) =>
          eachMail.mId === action.payload.mId
            ? { ...eachMail, unread: !eachMail.unread }
            : eachMail
        );
        return { ...mails, [action.payload.from]: modifiedEmails };
      }
      case "READ_UNREAD_IND_MAIL": {
        const modifiedEmails = mails[mails.requiredMailFrom].map((eachMail) =>
          eachMail.mId === action.payload.mId
            ? { ...eachMail, unread: !eachMail.unread }
            : eachMail
        );
        const mail = modifiedEmails.find(
          ({ mId }) => mId === action.payload.mId
        );
        return {
          ...mails,
          requiredMail: mail,
          [mails.requiredMailFrom]: modifiedEmails,
        };
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
      case "MARK_AS_NOT_SPAM": {
        const notSpamMail = mails.spamMails.find(
          ({ mId }) => mId === action.payload.mId
        );
        const modifiedSpamEmails = mails.spamMails.filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return {
          ...mails,
          spamMails: modifiedSpamEmails,
          emails: [...mails.emails, notSpamMail],
        };
      }
      case "DELETE_MAIL": {
        const deletedMail = mails[action.payload.from].find(
          ({ mId }) => mId === action.payload.mId
        );
        const modifiedEmails = mails[action.payload.from].filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return {
          ...mails,
          trashMails: [...mails.trashMails, deletedMail],
          [action.payload.from]: modifiedEmails,
        };
      }
      case "DELETE_PERMANENTLY": {
        const trashMailsModified = mails.trashMails.filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return { ...mails, trashMails: trashMailsModified };
      }
      case "RESTORE_DELETED_MAIL": {
        const restoreMail = mails.trashMails.find(
          ({ mId }) => mId === action.payload.mId
        );
        const trashMailsModified = mails.trashMails.filter(
          ({ mId }) => mId !== action.payload.mId
        );
        return {
          ...mails,
          emails: [...mails.emails, restoreMail],
          trashMails: trashMailsModified,
        };
      }
      case "VIEW_DETAILS_OF_MAIL": {
        const mail = mails[action.payload.from].find(
          ({ mId }) => mId === action.payload.mId
        );
        return {
          ...mails,
          requiredMail: mail,
          requiredMailFrom: action.payload.from,
        };
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
    requiredMailFrom: "",
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
