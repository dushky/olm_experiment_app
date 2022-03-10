import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink
} from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom'
import Echo from 'laravel-echo'
//@ts-ignore
window.Pusher = require('pusher-js')

// process.env.REACT_APP_PUSHER_ENV_KEY
//@ts-ignore
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'local',
  cluster: 'local',
  wsHost: 'api-exp01.iolab.sk',
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: true,
  disableStats: true,
  // enabledTransports: ['ws', 'wss']
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({
      uri: 'https://api-exp01.iolab.sk/graphql',
      // credentials: 'include',
    })
  ]),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
