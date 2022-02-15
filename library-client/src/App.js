import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserComponent from './components/UserComponent';

function App() {
  return (
    <div className="App container mb-4">
      <header className="App-header mt-4">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='text-center mt-4'>Library Users</h1>
      </header>

      <UserComponent />
    </div>
  );
}

export default App;
