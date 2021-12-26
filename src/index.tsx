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

//@ts-ignore
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_ENV_KEY,
  cluster: process.env.REACT_APP_PUSHER_ENV_CLUSTER,
  wsHost: process.env.REACT_APP_PUSHER_HOST,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true
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
      uri: 'http://olm-api.test/graphql',
      credentials: 'include',
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
