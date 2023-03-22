import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const start = document.querySelector('button[data-start]');
start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');
    } else {
      start.disabled = false;
    }
  },
};

let timerId = null;
const timerInput = document.querySelector('#datetime-picker');
const datePicker = flatpickr(timerInput, options);

let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

start.addEventListener('click', () => {
  timerId = setInterval(() => {
    let date = new Date();
    let dataForTimer = convertMs(
      datePicker.selectedDates[0].getTime() - date.getTime()
    );
    if (
      dataForTimer.days === 0 &&
      dataForTimer.hours === 0 &&
      dataForTimer.minutes === 0 &&
      dataForTimer.seconds === 0
    ) {
      seconds.textContent = '00';
      Notify.success('Ding Ding Ding');
      clearInterval(timerId);
    } else if (
      dataForTimer.days < 0 ||
      dataForTimer.hours < 0 ||
      dataForTimer.minutes < 0 ||
      dataForTimer.seconds < 0
    ) {
      clearInterval(timerId);
      Notify.failure('Please choose a date in the future');
    } else {
      days.textContent = addLeadingZero(dataForTimer.days);
      hours.textContent = addLeadingZero(dataForTimer.hours);
      minutes.textContent = addLeadingZero(dataForTimer.minutes);
      seconds.textContent = addLeadingZero(dataForTimer.seconds);
    }
  }, 1000);
});
