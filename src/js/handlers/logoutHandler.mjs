export const logoutUserHandler = () => {
  const logoutBtn = document.querySelector('#logoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clearing localStorage
      localStorage.clear();

      // Redirect to login page
      window.location.href = 'login.html';
    });
  }
};
