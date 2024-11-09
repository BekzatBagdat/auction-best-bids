import { LISTINGS_URL } from '../constants/api.mjs';
import { countDownSingleListing } from '../ui/lists/countDownSingleListing.mjs';

export const singleListingHandler = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const accessToken = localStorage.getItem('accessToken');
    const myCredits = localStorage.getItem('credits');

    const res = await fetch(`${LISTINGS_URL}/${id}?_seller=true&_bids=true`);
    const listing = await res.json();

    // Sale countdown
    const endsAt = listing.data.endsAt;
    countDownSingleListing(endsAt);
    // FILLING IN ELEMENTS with Single Listing Data
    document.querySelector('h1').innerText = listing.data.title;
    document.querySelector('.bid-by-p').innerText =
      `Bid By @${listing.data.seller.name}`;
    document.querySelector('.listing-description').innerText =
      listing.data.description;
    document.querySelector('.listing-image').src =
      listing.data.media && listing.data.media.length > 0
        ? listing.data.media[0].url
        : './src/img/defaultImage.png';
    if (accessToken) {
      document.querySelector('.listing-my-credits-amount').innerText =
        myCredits;
      if (listing.data.bids && listing.data.bids.length > 0) {
        const bidsContainer = document.querySelector(
          '.listing-bids-cards-container',
        );
        bidsContainer.innerHTML = '';

        listing.data.bids.forEach((bid) => {
          const bidCard = `
          <div class="m-2 listing-bid-card d-flex align-items-center gap-2">
            <img src="${bid.bidder.avatar.url}" alt="profile" />
            <p>@${bid.bidder.name}</p>
            <div>
              <p>${bid.amount} Cred</p>
            </div>
          </div>
        `;
          bidsContainer.innerHTML += bidCard;
        });
      } else {
        document.querySelector('.listing-bids-container').innerText =
          'No bids have been made yet.';
      }
    } else if (!accessToken) {
      document.querySelector('.my-credits-container').innerHTML = '';
      document.querySelector('.listing-bid-input').innerHTML = '';
      document.querySelector('.listing-bids-container').innerHTML =
        '<p style="font-size: 1.2rem">Please <a href="login.html">Login</a> to bid and view others bids made on the listing</p>';
    }
  } catch (error) {
    console.error('Failed to fetch', error);
  }
};
