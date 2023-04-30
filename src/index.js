import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import MailsContextProvider from "./contexts/MailsContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <MailsContextProvider>
      <App />
    </MailsContextProvider>
  </BrowserRouter>
);
