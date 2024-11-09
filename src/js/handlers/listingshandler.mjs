import { LISTINGS_URL } from '../constants/api.mjs';
import { countDownListings } from '../ui/lists/countDownListings.mjs';

export const listingsHandler = async () => {
  const listingContainer = document.querySelector('#listingContainer');
  listingContainer.innerHTML = '';

  const sortBy = 'updated';
  const sortOrder = 'desc';
  try {
    const res = await fetch(
      `${LISTINGS_URL}?sort=${sortBy}&sortOrder=${sortOrder}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const listings = await res.json();
    const sortedListings = listings.data.sort(
      (a, b) => new Date(b.updated) - new Date(a.updated),
    );

    // Search functionality
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (e) => {
      // Prevent page reload
      e.preventDefault();
    });
    const searchInput = document.querySelector('#searchListingInput');

    let searchOutput = [];
    searchInput.addEventListener('input', (e) => {
      e.preventDefault();
      const value = e.target.value;
      // Filter listings based on search input
      const filteredListings = searchOutput.filter((listing) =>
        listing.title.toLowerCase().includes(value),
      );
      listingContainer.innerHTML = '';
      filteredListings.forEach((listing) => {
        listingContainer.appendChild(listing.element);
      });
    });

    searchOutput = sortedListings.map((listing) => {
      const id = listing.id;

      const title = listing.title;

      const description = listing.description;

      const image =
        listing.media && listing.media.length > 0 && listing.media[0].url
          ? listing.media[0].url
          : 'src/img/defaultImage.png';

      const endsAt = new Date(listing.endsAt);

      const html = document.createElement('div');
      html.className = 'listing-card card mt-4';
      html.style.width = '18rem';

      html.innerHTML = `
          <img
            src="${image}"  
            class="card-img-top"
            alt="${title}" 
          />
          <div class="card-body">
            <a href="/listing.html?id=${id}" style="text-decoration: none; color: inherit;">
              <h5>${title}</h5> 
            </a>
            <p class="card-text">
              ${description}
            </p>
            <p id="countdown-${id}" style="color: rgb(171, 3, 3)">Loading...</p> 
          </div>
      `.trim();

      listingContainer.appendChild(html);
      // countdown for the listing deadline
      countDownListings(endsAt, id);
      return { title: title, element: html };
    });
  } catch (error) {
    console.log(error);
  }
};
