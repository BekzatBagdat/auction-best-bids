import { UPDATE_URL } from '../../constants/api.mjs';
import { PROFILE_URL } from '../../constants/api.mjs';
import { API_KEY } from '../../constants/api.mjs';

export const checkCreditBalance = async () => {
  const username = localStorage.getItem('username');
  const accessToken = localStorage.getItem('accessToken');

  if (!username || !accessToken) return;

  try {
    const profileRes = await fetch(`${PROFILE_URL}/${username}`, {
      headers: {
        'X-Noroff-API-Key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      console.error('Failed to fetch profile data:', profileRes.status);
      return;
    }

    const profileData = await profileRes.json();
    let { credits } = profileData.data;

    //if credits are missing or zero
    if (!credits || credits === 0) {
      credits = 1000;

      // Update credits in the API
      const updateRes = await fetch(`${UPDATE_URL}${username}`, {
        method: 'PUT',
        headers: {
          'X-Noroff-API-Key': API_KEY,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }),
      });

      if (updateRes.ok) {
        localStorage.setItem('credits', credits);
        localStorage.setItem('creditsInitialized', 'true');
      } else {
        console.error('Failed to update credits', updateRes.status);
      }
    } else {
      localStorage.setItem('credits', credits);
      // Reload only if the page hasn't been reloaded previously
      if (!localStorage.getItem('profileReloadedOnce')) {
        localStorage.setItem('profileReloadedOnce', 'true');
        window.location.reload();
      }
    }
  } catch (error) {
    console.error('Error checking or updating credits:', error);
  }
};
