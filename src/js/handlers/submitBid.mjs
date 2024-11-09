import { API_KEY } from '../constants/api.mjs';
import { LISTINGS_URL } from '../constants/api.mjs';
import { UPDATE_URL } from '../constants/api.mjs';
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

const API_URL = `${LISTINGS_URL}/${listingId}/bids`;
const accessToken = localStorage.getItem('accessToken');
let credits = Number(localStorage.getItem('credits'));

const submitBid = async () => {
  const bidAmount = Number(document.querySelector('#bidAmount').value);
  const bidMessage = document.querySelector('#bidMessage');

  if (!bidAmount || bidAmount <= 0) {
    bidMessage.innerText = 'Please enter a valid bid amount.';
    return;
  }

  if (bidAmount > credits) {
    bidMessage.innerText = 'You dont have enough credits to place this bid.';
    return;
  }

  const bidData = { amount: bidAmount };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(bidData),
    });
    const username = localStorage.getItem('username');
    let creditsLeft = credits - bidAmount;
    await fetch(`${UPDATE_URL}${username}`, {
      method: 'PUT',
      headers: {
        'X-Noroff-API-Key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ creditsLeft }),
    });

    if (response.ok) {
      credits -= bidAmount;
      localStorage.setItem('credits', credits);
      location.reload();
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      bidMessage.innerText = `${errorData.errors[0]?.message || 'Please try again.'}`;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    bidMessage.innerText = 'Error submitting bid. Please try again later.';
  }
};

export const submitBidHandler = () => {
  const submitBidButton = document.querySelector('#button-addon');
  submitBidButton.addEventListener('click', submitBid);
};
