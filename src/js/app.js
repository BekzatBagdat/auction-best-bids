import { registerFormHandler } from './handlers/registerFormHandler.mjs';
import { loginFormHandler } from './handlers/loginFormHandler.mjs';
import { checkLogin } from './auth/checkLogin.mjs';
import { logoutUserHandler } from './handlers/logoutHandler.mjs';
import { requireLogin } from './auth/requirelogin.mjs';
import { changeAvatarFormHandler } from './handlers/updateAvatarFormhandler.mjs';
import { listingsHandler } from './handlers/listingshandler.mjs';
import { createListingFormHandler } from './handlers/createlistinghandler.mjs';
import { singleListingHandler } from './handlers/singleListingHandler.mjs';
import { submitBidHandler } from './handlers/submitBid.mjs';
import { checkCreditBalance } from './ui/profile/checkCreditBalance.mjs';
const router = () => {
  checkLogin();
  switch (window.location.pathname) {
    case '/':
    case '/index.html':
      listingsHandler();
      break;
    case '/register.html':
    case '/register':
      registerFormHandler();
      break;
    case '/login.html':
    case '/login':
      loginFormHandler();
      break;
    case '/profile.html':
    case '/profile':
      requireLogin();
      checkCreditBalance();
      logoutUserHandler();
      break;
    case '/changeavatar.html':
    case '/changeavatar':
      requireLogin();
      changeAvatarFormHandler();
      break;
    case '/createlisting.html':
    case '/createlisting':
      requireLogin();
      createListingFormHandler();
      break;
    case '/listing.html':
    case '/listing':
      singleListingHandler();
      submitBidHandler();
      break;
  }
};
router();
