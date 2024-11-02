import { registerFormHandler } from './handlers/registerFormHandler.mjs';
import { loginFormHandler } from './handlers/loginFormHandler.mjs';
import { checkLogin } from './auth/checkLogin.mjs';
import { logoutUserHandler } from './handlers/logoutHandler.mjs';
import { requireLogin } from './auth/requirelogin.mjs';
import { changeAvatarFormHandler } from './handlers/updateAvatarFormhandler.mjs';

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
      requireLogin();
      logoutUserHandler();
      break;
    case '/changeavatar.html':
      requireLogin();
      changeAvatarFormHandler();
      break;
  }
};
router();
