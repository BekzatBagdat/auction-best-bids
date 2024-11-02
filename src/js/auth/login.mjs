import { UPDATE_URL } from '../constants/api.mjs';
import { API_KEY } from '../constants/api.mjs';
// Post Login API
export const loginUser = async (url, userData) => {
  // DOMs
  const messageContainer = document.querySelector('.login-message');
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const json = await res.json();
    const accessToken = json.data.accessToken;

    if (!accessToken) {
      messageContainer.innerHTML = '';
      messageContainer.innerHTML = `<p style="color:rgb(178, 0, 0)">Wrong Email or Password ❌</p>`;

      localStorage.clear();
    }
    if (accessToken) {
      messageContainer.innerHTML = '';
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', json.data.name);
      localStorage.setItem('email', json.data.email);
      localStorage.setItem('url', json.data.avatar.url);
      localStorage.setItem('alt', json.data.avatar.alt);
      //Adding Credits
      if (!json.credits || json.credits === undefined) {
        await fetch(UPDATE_URL + json.data.name, {
          method: 'PUT',
          headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ credits: 1000 }),
        });
        localStorage.setItem('credits', 1000);
      }
      window.location.href = 'profile.html';
    }
  } catch (error) {
    console.log(error);
    messageContainer.innerHTML = `<p style="color:rgb(178, 0, 0)">Wrong Password or Email ❌</p>`;
  }
};
