export const loginUser = async (url, userData) => {
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
    console.log(json);
    const accessToken = json.data.accessToken;

    if (!accessToken) {
      messageContainer.innerHTML = `<p style="color:rgb(178, 0, 0)">Wrong Email or Password ❌</p>`;
      localStorage.clear();
      return;
    }

    // Store essential user data in localStorage
    messageContainer.innerHTML = '';
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', json.data.name);
    localStorage.setItem('email', json.data.email);
    localStorage.setItem('url', json.data.avatar.url);
    localStorage.setItem('alt', json.data.avatar.alt);

    window.location.href = 'profile.html';
  } catch (error) {
    console.error(error);
    messageContainer.innerHTML = `<p style="color:rgb(178, 0, 0)">Wrong Password or Email ❌</p>`;
  }
};
