//POST registered userdata API
export const regUser = async (url, data) => {
  const messageContainer = document.querySelector('.signup-message');
  messageContainer.innerHTML = '';
  try {
    // API Call
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to create an account.';
      messageContainer.innerHTML = `<p style="color:rgb(178, 0, 0)">${errorMessage} ❌</p>`;
    } else {
      messageContainer.innerHTML = `<p style="color:rgb(13, 120, 1)">Account has been created ✅</p>`;
    }
  } catch (error) {
    messageContainer.innerHTML = `<p class="mt-1" style="color:rgb(178, 0, 0)">An Error has Occured during the registration 😔 ${error}</p>`;
  }
};
