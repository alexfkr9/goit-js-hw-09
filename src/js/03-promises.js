import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('.form input[name=delay]'),
  step: document.querySelector('.form input[name=step]'),
  amount: document.querySelector('.form input[name=amount]'),
  button: document.querySelector('.form button[type=submit]'),
};

refs.button.addEventListener('click', getPromise);

function getPromise(e) {
  e.preventDefault();

  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);

  for (let i = 1; i <= refs.amount.value; i++) {
    delay += step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}
