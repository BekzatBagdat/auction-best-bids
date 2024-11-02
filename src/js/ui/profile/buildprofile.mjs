export const buildProfile = () => {
  //DOMs
  const usernameEl = document.querySelector('.profile-username-container p');
  const creditsEl = document.querySelector('#creditsP');
  const imgEl = document.querySelector('#profileImg');
  // Fill in Profile Details
  const username = localStorage.getItem('username');
  const credits = localStorage.getItem('credits');
  const url = localStorage.getItem('url');
  const alt = localStorage.getItem('alt');
  usernameEl.innerHTML = `@${username}`;
  creditsEl.innerHTML = credits;
  imgEl.src = url;
  imgEl.alt = alt;
  //styling
  imgEl.style.width = '125px';
  imgEl.style.height = '125px';
  imgEl.style.objectFit = 'cover';
  imgEl.style.borderRadius = '50%';
  imgEl.style.boxShadow = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px';
};
