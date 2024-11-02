export const requireLogin = () => {
  const accessToken = localStorage.getItem('accessToken');
  // Check accessToken/if User is not logged in, redirect to login.html
  if (!accessToken) {
    window.location.href = 'login.html';
  }
};
