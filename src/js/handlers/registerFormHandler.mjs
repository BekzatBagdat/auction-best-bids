import { REGISTER_URL } from '../constants/api.mjs';
import { regUser } from '../auth/register.mjs';
export const handleRegisterForm = (e) => {
  // Prevent Default
  e.preventDefault();
  // Signup data variable
  let userData;
  //DOM register.html
  const username = document.querySelector('#signUpUsername').value;
  const email = document.querySelector('#signUpEmail').value;
  const avatar = document.querySelector('#signUpAvatar').value;
  const password = document.querySelector('#signUpPassword').value;
  const confirmPassword = document.querySelector(
    '#signUpConfirmPassword',
  ).value;
  // Message DOM
  const messageContainer = document.querySelector('.signup-message');
  // Validate form
  let formValid = true;
  /*Function validates that email is @stud.noroff.no*/
  const validateEmail = (email) => email.endsWith('@stud.noroff.no');
  if (confirmPassword.trim() !== password) {
    messageContainer.innerHTML = `<p style="color: red">Password does not match ❌</p>`;
    formValid = false;
  }
  if (avatar.trim() === '') {
    messageContainer.innerHTML = `<p style="color: red">Please fill in the Avatar URL field ⚠️</p>`;
    formValid = false;
  }
  if (!validateEmail(email)) {
    messageContainer.innerHTML = `<p style="color: red">Email field must be @stud.noroff.no ⚠️</p>`;
    formValid = false;
  }
  if (email.trim() === '') {
    messageContainer.innerHTML = `<p style="color: red">Please fill in the E-mail field ⚠️</p>`;
    formValid = false;
  }
  if (username.trim() === '') {
    messageContainer.innerHTML = `<p style="color: red">Please fill in the Username field ⚠️</p>`;
    formValid = false;
  }
  if (formValid === true) {
    messageContainer.innerHTML = '';
    // Adding form value into signup data object
    userData = {
      name: username,
      email: email,
      password: password,
      avatar: {
        url: avatar,
        alt: `${username}'s avatar`,
      },
    };
    regUser(REGISTER_URL, userData);
  }
};
export const registerFormHandler = () => {
  const signupForm = document.querySelector('.signup-form');
  signupForm.addEventListener('submit', handleRegisterForm);
};
