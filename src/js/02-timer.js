import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      refs.buttonStart.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStart.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('input#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('.timer span[data-days]'),
  hours: document.querySelector('.timer span[data-hours]'),
  minutes: document.querySelector('.timer span[data-minutes]'),
  seconds: document.querySelector('.timer span[data-seconds]'),
};

let interval;

refs.buttonStart.addEventListener('click', () => {
  refs.buttonStart.setAttribute('disabled', true);
  if (selectedDate <= Date.now()) {
    Notify.warning('The date has come already ! Please choose a new date');
    return;
  }
  getTime(); // to start changing the time indication without a delay of 1s
  interval = setInterval(getTime, 1000);
});

function getTime() {
  const remainTime = selectedDate - Date.now();

  const { days, hours, minutes, seconds } = convertMs(remainTime);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);

  if (remainTime < 1000) {
    clearInterval(interval);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
