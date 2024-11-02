import { LOGIN_URL } from '../constants/api.mjs';
import { loginUser } from '../auth/login.mjs';

export const handleLoginForm = (e) => {
  e.preventDefault();

  // DOMs
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;
  //Data
  let userData;

  userData = {
    email: email,
    password: password,
  };
  loginUser(LOGIN_URL, userData);
};

export const loginFormHandler = () => {
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', handleLoginForm);
};
