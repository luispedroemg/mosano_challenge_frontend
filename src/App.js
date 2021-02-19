import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import APIClient from './api_client/APIClient';

import './App.css';
import RegisterForm from './RegisterForm';
import UserMessage from './UserMessage';
import RegisterListPaginated from './RegisterListPaginated';

function App(props) {
  let { userListLimit } = props;
  if (!userListLimit) userListLimit = 2;

  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [numUsers, setNumUsers] = useState(0);
  const [userListPage, setUserListPage] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [registerList, setRegisterList] = useState([]);

  useEffect(() => {
    APIClient.getCountryList().then((list) => setCountryList(list), (err) => setErrors([err]));
  }, []);

  useEffect(() => {
    APIClient.getUserList(userListLimit, userListPage).then((content) => {
      const { total, users } = content;
      setRegisterList(users);
      setNumUsers(total);
    }, (err) => setErrors([err]));
  }, [userListPage]);

  function setUser(user) {
    i18n.changeLanguage(user.country.countryCode.toLowerCase()).then(() => setSelectedUser(user), (err) => setErrors(err));
  }

  function onSubmitRegister(userData) {
    APIClient.getUserList(userListLimit, 0).then((content) => {
      const { total, users } = content;
      setRegisterList(users);
      setNumUsers(total);
    }, (err) => setErrors(err));
    setUser(userData);
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
      <RegisterListPaginated
        registerList={registerList}
        totalUsers={numUsers}
        selectUser={(user) => setUser(user)}
        setPage={(pageIdx) => setUserListPage(pageIdx)}
        userListPage={userListPage}
      />
    </div>
  );
}

export default App;
