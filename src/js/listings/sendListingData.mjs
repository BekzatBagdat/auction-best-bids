import { API_KEY } from '../constants/api.mjs';

export const sendListingData = async (url, data) => {
  const messageContainer = document.querySelector(
    '.create-listing-message-container',
  );
  messageContainer.innerHTML = '';
  const accessToken = localStorage.getItem('accessToken');
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorMessage = `<p style="color: red">
        Please try again, ensure that links are valid
      </p>`;
      messageContainer.innerHTML = errorMessage;
    }

    setTimeout(() => {
      window.location.pathname = 'index.html';
    }, 1000);
  } catch (error) {
    messageContainer.innerHTML = `<p style="color: red">
        ${error}
      </p>`;
  }
};
