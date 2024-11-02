import { registerFormHandler } from './handlers/registerFormHandler.mjs';
import { loginFormHandler } from './handlers/loginFormHandler.mjs';
import { checkLogin } from './auth/checkLogin.mjs';
import { logoutUser } from './auth/logout.mjs';

const router = () => {
  checkLogin();
  switch (window.location.pathname) {
    case '/':
    case '/register.html':
      registerFormHandler();
      break;
    case '/login.html':
      loginFormHandler();
      break;
    case '/profile.html':
      logoutUser();
  }
};
router();
