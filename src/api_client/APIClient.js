import * as base64 from 'base-64';

function hasErrors(response) {
  return !(response.status === 200 || response.status === 201);
}

function handleErrors(response, errorCallback) {
  if (!hasErrors(response)) throw new Error('No errors to handle but calling error handler.');
  else response.json().then((errData) => errorCallback(errData));
}

function getCountryList(responseCallback, errorCallback) {
  fetch('http://localhost:3001/countries')
    .then((response) => {
      response.json().then((countries) => {
        responseCallback(countries);
      }, (err) => errorCallback([{ error: 'frontend', msg: `Error parsing country list json: ${err}` }]));
    }, (err) => errorCallback([{ error: 'frontend', msg: `Error fetching country list: ${err}` }]));
}

function getUserList(responseCallback, errorCallback) {
  fetch('http://localhost:3001/users')
    .then((usersResponse) => usersResponse.json(), (err) => errorCallback([{ error: 'frontend', msg: `Error fetching country list json:${err}` }]))
    .then((data) => responseCallback(data), (err) => errorCallback([{ error: 'frontend', msg: `Error fetching country list json:${err}` }]));
}

function postUser(userData, responseCallback, errorCallback, apiCreds) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`${apiCreds.username}:${apiCreds.password}`)}`,
    },
    body: JSON.stringify(userData),
  };
  fetch('http://localhost:3001/users', requestOptions)
    .then((response) => {
      if (hasErrors(response)) {
        handleErrors(response, errorCallback);
      } else {
        response.json().then((user) => {
          responseCallback(user);
        }, (err) => errorCallback([{ error: 'frontend', msg: `Error parsing user data json: ${err}` }]));
      }
    }, (err) => errorCallback([{ error: 'frontend', msg: `Error fetching user data: ${err}` }]));
}

export default { getCountryList, getUserList, postUser };
