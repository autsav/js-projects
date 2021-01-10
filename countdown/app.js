const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//check for the current year, month , date and day
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2021,3,10,5,30,1,2);
let futureDate = new Date(tempYear,tempMonth,tempDay + 10,5,30,1,2);

// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const secs = futureDate.getSeconds();

const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on , ${date} ${month} ${year}, ${hours}:${mins}am`;

//future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today =new Date().getTime();
  const r = futureTime - today;
  // console.log(r);
  //1s = 1000ms
  //1m = 60s
  //1hr = 60min
  //1day =24hr

  // values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute =60*1000;

  //calculate all values
  let days = r / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((r % oneDay) / oneHour);
  let minutes = Math.floor((r % oneHour)/ oneMinute);
  let seconds = Math.floor((r % oneMinute)/ 1000)
  // console.log(seconds);
  // set values in array:
  const values = [days, hours, minutes,seconds];

  function format(item){
    if(item < 10){
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  if(r<0){
    clearInterval(countdown);
    deadline.innerHTML = `<h3 class = "expired">sorry, this giveaway has expired</h3>`;
  }
}
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
