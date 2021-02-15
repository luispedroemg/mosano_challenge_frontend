import React from 'react';

function RegisterForm(props) {
  const { countryList } = props;
  const countryOptionList = countryList.map((country) => (
    <option key={country} value={country}>{country}</option>
  ));
  return (
    <form style={{
      display: 'flex', flexDirection: 'column', alignItems: 'start', margin: '2%',
    }}
    >
      <label htmlFor="name">
        Name:
        <input name="name" id="name" />
      </label>
      <label htmlFor="surname">
        Surname:
        <input name="surname" id="surname" />
      </label>
      <label htmlFor="country">
        Country:
        <select name="country" id="country">
          {countryOptionList}
        </select>
      </label>
      <label htmlFor="birthday">
        Birthday:
        <input name="birthday" id="birthday" />
      </label>
    </form>
  );
}

export default RegisterForm;
