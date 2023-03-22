const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
let timerId = null;

start.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
});

stop.addEventListener('click', () => {
  if (start.disabled) {
    start.disabled = false;
    clearInterval(timerId);
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
