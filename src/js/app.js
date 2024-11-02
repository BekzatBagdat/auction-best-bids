import { registerFormHandler } from './handlers/registerFormHandler.mjs';
import { loginFormHandler } from './handlers/loginFormHandler.mjs';
import { checkLogin } from './auth/checkLogin.mjs';
import { logoutUser } from './auth/logout.mjs';

const router = () => {
  checkLogin();
  switch (window.location.pathname) {
    case '/':
    case '/register':
      registerFormHandler();
      break;
    case '/login':
      loginFormHandler();
      break;
    case '/profile':
      logoutUser();
  }
};
router();
