import React from 'react';
import './App.css';
import RegisterForm from './RegisterForm';

function App() {
  const countryList = ['Portugal', 'England'];
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <header className="App-header">
        <RegisterForm countryList={countryList} />
      </header>
    </div>
  );
}

export default App;
