import { UPDATE_URL } from '../constants/api.mjs';
import { API_KEY } from '../constants/api.mjs';

export const handleUpdateAvatar = async (e) => {
  e.preventDefault();
  const messageContainer = document.querySelector('.change-avatar-container');
  const avatarInputValue = document.querySelector('#changeAvatarURL').value;
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  const message = `<p style="color: red">
              Something went wrong ⚠️
            </p>`;

  let data = {
    avatar: {
      url: avatarInputValue,
      alt: `${username}'s Avatar`,
    },
  };
  try {
    const apiURL = UPDATE_URL + username;
    const res = await fetch(apiURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      messageContainer.insertAdjacentHTML('afterbegin', message);
    }
    localStorage.setItem('url', data.avatar.url);
    window.location.href = 'profile.html';
  } catch (error) {
    console.log(error);
  }
};

export const changeAvatarFormHandler = () => {
  const btn = document.querySelector('#changeAvatarBtn');
  btn.addEventListener('click', handleUpdateAvatar);
};
