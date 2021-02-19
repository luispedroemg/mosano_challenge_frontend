import * as base64 from 'base-64';

function hasErrors(response) {
  return !(response.status === 200 || response.status === 201);
}

async function handleErrors(response) {
  let err;
  let errData;
  if (!hasErrors(response)) err = new Error('No errors to handle but calling error handler.');
  try {
    errData = await response.json();
  } catch (e) { err = e; }
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    reject(errData);
  });
}

async function performCall(endpoint, requestOptions = {}, { username = '', password = '' } = {}) {
  const options = requestOptions;
  options.headers = { ...requestOptions.headers, Authorization: `Basic ${base64.encode(`${username}:${password}`)}` };
  let err;
  let response;
  try {
    response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options);
    if (hasErrors(response)) return handleErrors(response);
  } catch (e) {
    err = e;
  }
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    resolve(response);
  });
}

async function getCountryList(limit = 10, page = 0) {
  let err;
  let countries;
  try {
    const response = await performCall(`/countries?limit=${limit}&page=${page}`);
    countries = await response.json();
  } catch (e) {
    err = e;
  }
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    resolve(countries);
  });
}

async function getUserList(limit = 10, page = 0) {
  let err;
  let content;
  try {
    const response = await performCall(`/users?limit=${limit}&page=${page}`);
    if (hasErrors(response)) return handleErrors(response);
    content = await response.json();
    if (!content) return Promise.reject(new Error('Could not fetch user list'));
  } catch (e) {
    err = e;
  }
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    resolve(content);
  });
}

async function postUser(userData, apiCredentials) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  let user;
  let err;
  try {
    const response = await performCall('/users',
      requestOptions,
      { username: apiCredentials.username, password: apiCredentials.password });
    if (hasErrors(response)) return handleErrors(response);
    user = await response.json();
  } catch (e) {
    err = e;
  }

  return new Promise((resolve, reject) => {
    if (err) reject(err);
    resolve(user);
  });
}

export default { getCountryList, getUserList, postUser };
