export const createListing = (e) => {
  e.preventDefault();
  const title = document.querySelector('#createListingTitle').value;
  const imageURL = document.querySelector('#createListingURL').value;
  const description = document.querySelector('#createListingDescription').value;
  const date = document.querySelector('#createListingDate').value;
  const dateFormatted = new Date(date);

  const data = {
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
  console.log(data);
};

export const createListingFormHandler = () => {
  const btn = document.querySelector('#changeAvatarBtn');
  btn.addEventListener('click', createListing);
};
