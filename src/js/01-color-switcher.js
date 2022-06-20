const body = document.querySelector('body');

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let timer;
buttonStart.addEventListener('click', () => {
  buttonStart.setAttribute('disabled', true);
  timer = setInterval(setColor, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timer);
  buttonStart.removeAttribute('disabled');
});

function setColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
