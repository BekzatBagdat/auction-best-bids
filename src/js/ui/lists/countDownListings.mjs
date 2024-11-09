export const countDownListings = (endsAt, id) => {
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endsAt - now;

    const displayCountDownEl = document.querySelector(`#countdown-${id}`);
    //if the countdown element not exist
    if (!displayCountDownEl) {
      clearInterval(countdownInterval); // Clear the interval if the element is missing
      return;
    }

    if (timeLeft > 0) {
      // Time calculations
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      displayCountDownEl.innerHTML = `${days} Days : ${hours} Hours : ${minutes} Min : ${seconds} Sec`;
    } else {
      // When countdown is over
      displayCountDownEl.innerHTML = 'THE SALE IS CLOSED';
      clearInterval(countdownInterval);
    }
  }, 1000);
};
