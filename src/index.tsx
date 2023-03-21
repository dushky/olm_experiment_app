import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider, Cookies } from "react-cookie";

import Echo from "laravel-echo";
//@ts-ignore
window.Pusher = require("pusher-js");

// process.env.REACT_APP_PUSHER_ENV_KEY
//@ts-ignore
window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_ENV_KEY,
  cluster: process.env.REACT_APP_PUSHER_ENV_CLUSTER,
  wsHost: process.env.REACT_APP_PUSHER_ENV_WSHOST,
  wsPort: process.env.REACT_APP_PUSHER_ENV_WSPORT,
  wssPort: process.env.REACT_APP_PUSHER_ENV_WSSPORT,
  forceTLS: true,
  disableStats: true,
  // enabledTransports: ['ws', 'wss']
});

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${cookies.get("access_token") || ""}`,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({
      uri: process.env.REACT_APP_API_ENDPOINT || "http://127.0.0.1:8000/graphql",
    }),
  ]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
