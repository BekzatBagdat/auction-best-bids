export const countDownSingleListing = (endsAt) => {
  const endTime = new Date(endsAt).getTime();

  // Update countdown
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    //Countdown Element
    const displayCountDownEl = document.querySelector('.countdown-listing');

    if (displayCountDownEl) {
      if (timeLeft > 0) {
        // Time Calculations
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display
        displayCountDownEl.innerText = `${days} Days : ${hours} Hours : ${minutes} Min : ${seconds} Sec`;
      } else {
        // The Sale is closed
        displayCountDownEl.innerText = 'THE SALE IS CLOSED';
        document.querySelector('.listing-bid-input').innerHTML = '';
        clearInterval(countdownInterval);
      }
    }
  }, 1000);
};
