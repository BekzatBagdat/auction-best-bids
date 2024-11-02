import { LISTINGS_URL } from '../constants/api.mjs';
import { countDownListings } from '../ui/lists/countDownListings.mjs';

export const listingsHandler = async () => {
  const listingContainer = document.querySelector('#listingContainer');
  try {
    const res = await fetch(LISTINGS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const listings = await res.json();

    listings.data.map((listing) => {
      const id = listing.id;

      const title = listing.title;

      const description = listing.description;

      const image =
        listing.media && listing.media.length > 0 && listing.media[0].url
          ? listing.media[0].url
          : 'src/img/defaultImage.png';

      const endsAt = new Date(listing.endsAt);

      const html = `
      <div class="card mt-4" style="width: 18rem">
          <img
            src="${image}"  
            class="card-img-top"
            alt="${title}" 
          />
          <div class="card-body">
            <h5>${title}</h5> 
            <p class="card-text">
              ${description}
            </p>
            <p id="countdown-${id}" style="color: rgb(171, 3, 3)">Loading...</p> 
          </div>
      </div>
      `;
      listingContainer.innerHTML += html;

      // countdown for the listing deadline
      countDownListings(endsAt, id);
    });
  } catch (error) {
    console.log(error);
  }
};
