import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

import APIClient from './api_client/APIClient';
import Login from './Login';

import './RegisterForm.css';
import ErrorMessage from './ErrorMessage';

function RegisterForm(props) {
  const { t } = useTranslation();
  const {
    onSubmitCallback, onSubmitErrorCallback, countryList, errors,
  } = props;
  const [apiCreds, setAPICreds] = useState({ username: '', password: '' });
  const [currentFormState, setFormState] = useState({
    name: '', surname: '', countryCode: 'PT', birthday: new Date(),
  });

  const countryOptionList = countryList.map((country) => (
    <option key={country.countryCode} value={country.countryCode}>{country.name}</option>
  ));

  function onSubmit() {
    APIClient.postUser(
      currentFormState,
      (user) => onSubmitCallback(user),
      (err) => onSubmitErrorCallback(err),
      apiCreds,
    );
  }

  return (
    <div className="formContainer">
      <Login
        onPasswordChange={(password) => setAPICreds({ ...apiCreds, password })}
        onUsernameChange={(username) => setAPICreds({ ...apiCreds, username })}
      />
      <ErrorMessage errors={errors} />
      <form
        className="userForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="userFormInput">
          <label htmlFor="name">{`${t('Name')}:`}</label>
          <input
            onChange={(event) => setFormState({ ...currentFormState, name: event.target.value })}
            type="text"
            name="name"
            id="name"
            value={currentFormState.name}
            required
          />
        </div>
        <div className="userFormInput">
          <label htmlFor="surname">{`${t('Surname')}:`}</label>
          <input
            onChange={(event) => setFormState({ ...currentFormState, surname: event.target.value })}
            type="text"
            name="surname"
            id="surname"
            value={currentFormState.surname}
            required
          />
        </div>
        <div className="userFormInput">
          <label htmlFor="countryCode">{t('Country')}</label>
          <select
            onChange={(event) => setFormState({ ...currentFormState, countryCode: event.target.value })}
            name="countryCode"
            id="countryCode"
            value={currentFormState.countryCode}
            required
          >
            {countryOptionList}
            <option key="ZZ" value="ZZ">ZZ Country</option>
          </select>
        </div>
        <div className="userFormInput">
          <label htmlFor="birthday">{`${t('Birthday')}:`}</label>
          <DatePicker
            selected={currentFormState.birthday}
            onChange={(date) => setFormState({ ...currentFormState, birthday: date })}
            id="birthday"
            name="birthday"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            required
          />
        </div>
        <button type="submit" value="Save" onClick={onSubmit}>Save</button>
      </form>
    </div>
  );
}

export default RegisterForm;
