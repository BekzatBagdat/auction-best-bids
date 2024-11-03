import { LISTINGS_URL } from '../constants/api.mjs';
import { sendListingData } from '../listings/sendListingData.mjs';
export const createListing = (e) => {
  e.preventDefault();
  const title = document.querySelector('#createListingTitle').value;
  const imageURL = document.querySelector('#createListingURL').value;
  const description = document.querySelector('#createListingDescription').value;
  const date = document.querySelector('#createListingDate').value;
  const dateFormatted = new Date(date);

  const formData = {
    title: title,
    description: description,
    media: [
      {
        url: imageURL,
        alt: title,
      },
    ],
    endsAt: dateFormatted.toISOString(),
  };
  sendListingData(LISTINGS_URL, formData);
};

export const createListingFormHandler = () => {
  const form = document.querySelector('#createListingForm');
  form.addEventListener('submit', createListing);
};
