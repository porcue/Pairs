document.addEventListener('DOMContentLoaded', () => {
  const btnStart = document.querySelector('.btn_start');
  const btnFinish = document.querySelector('.btn_finish');
  const container = document.querySelector('.cards__container');
  const card = document.querySelectorAll('.card');
  const timer = document.querySelector('.timer');
  const congrats = document.querySelector('.congrats');
  let finishGame = false;
  timer.textContent = 59;
  let timerId;
  function time() {
    timer.textContent--;
    if (timer.textContent <= 0) {
      clearInterval(timerId);
      timer.textContent = 0;
      btnFinish.classList.add('active');
      btnStart.classList.add('invisible');
      container.classList.add('opacity');
      finishGame = true;
    }
  }

  const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  let count = 0;

  (function shuffle() {
    for (let i = arr.length - 1; i > 0; i--) {
      const oldNumber = arr[i];
      const randomNumber = Math.floor(Math.random() * (i + 1));
      arr[i] = arr[randomNumber];
      arr[randomNumber] = oldNumber;
    }
    return arr;
  }());

  card.forEach((el, i) => el.textContent = arr[i]);

  let hasFlippedCard = false;
  let lockCard = false;
  let firstCard;
  let secondCard;

  btnStart.addEventListener('click', () => {
    container.classList.add('active');
    timer.classList.add('active');
    timerId = setInterval(time, 1000);
    btnStart.classList.add('invisible');
  });

  function unflipCards() {
    lockCard = true;
    setTimeout(() => {
      firstCard.classList.remove('active');
      secondCard.classList.remove('active');
      lockCard = false;
    }, 1000);
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }

  function check() {
    if (firstCard.textContent === secondCard.textContent) {
      disableCards();
      count++;
      return;
    }

    unflipCards();
  }

  function flipCard() {
    if (finishGame) return;
    if (lockCard) return;
    if (this === firstCard) return;
    card.forEach((el, i) => el.textContent = arr[i]);
    this.classList.add('active');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;

    check();

    if (count === card.length / 2) {
      btnFinish.classList.add('active');
      clearInterval(timerId);
      container.classList.add('opacity');
      timer.classList.remove('active');
      congrats.classList.add('active');
    }
  }

  card.forEach((el) => el.addEventListener('click', flipCard));
  btnFinish.addEventListener('click', () => window.location.reload());
});
