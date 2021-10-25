import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTestQuery } from './generated/graphql';

function App() {
  const test = useTestQuery({
    variables: {id: "1"}
  })

  console.log(test.data);
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
