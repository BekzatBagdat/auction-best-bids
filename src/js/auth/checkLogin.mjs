import { buildProfile } from '../ui/profile/buildprofile.mjs';
export const checkLogin = () => {
  const navProfileLink = document.querySelector('.profile-nav-link');
  if (navProfileLink) {
    // Check if the user is logged in
    const accessToken = localStorage.getItem('accessToken');
    // if user is logged in
    if (accessToken) {
      switch (window.location.pathname) {
        case '/profile.html':
          buildProfile();
      }
      navProfileLink.href = 'profile.html';
    }
    // if user is not logged in
    else {
      navProfileLink.href = 'login.html';
    }
    navProfileLink.addEventListener('click', (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        window.location.href = 'profile.html';
      } else {
        window.location.href = 'login.html';
      }
    });
  }
};
