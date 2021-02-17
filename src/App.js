import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import APIClient from './api_client/APIClient';

import './App.css';
import RegisterForm from './RegisterForm';
import RegisterList from './RegisterList';
import UserMessage from './UserMessage';

function App() {
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    APIClient.getCountryList((list) => setCountryList(list), (err) => setErrors(err));
  }, []);

  const [registerList, setRegisterList] = useState([]);
  useEffect(() => {
    APIClient.getUserList((list) => setRegisterList(list), (err) => setErrors(err));
  }, []);

  function setuser(user) {
    console.log(['set user', user]);
    i18n.changeLanguage(user.country.countryCode.toLowerCase());
    setSelectedUser(user);
  }

  function onSubmitRegister(userData) {
    APIClient.getUserList((list) => setRegisterList(list), (err) => setErrors(err));
    setuser(userData);
    setErrors([]);
  }

  function onSubmitError(err) {
    setErrors(err);
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <div className="RegisterForm">
        <RegisterForm countryList={countryList} onSubmitCallback={onSubmitRegister} onSubmitErrorCallback={onSubmitError} errors={errors} />
        {selectedUser && (
          <UserMessage selectedUser={selectedUser} />
        )}
        <div style={{ margin: '5%' }}>
          {`${t('Current language is')} ${i18n.language}`}
        </div>
      </div>
      <RegisterList registerList={registerList} onUserSelectCallback={(user) => setuser(user)} />
    </div>
  );
}

export default App;
