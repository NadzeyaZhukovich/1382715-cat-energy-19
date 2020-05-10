// MENU
let navMain = document.querySelector('.main-nav');
let navToggle =document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// SLIDER

let pictureBefore = document.querySelector(".example__picture--before");
let pictureAfter = document.querySelector(".example__picture--after");
let sliderInput = document.querySelector(".slider__range");
let range = document.querySelector(".slider__range-control");
let toggle = document.querySelector(".slider__switcher-toggle");
let buttonBefore = document.querySelector(".slider__button--before");
let buttonAfter = document.querySelector(".slider__button--after");

sliderInput.addEventListener("change", function () {
  console.log("value: ", sliderInput.value);
  pictureBefore.style.width = (340 / 100 * sliderInput.value).toString() + "px";
  pictureAfter.style.marginLeft = (300 - (340 / 100 * sliderInput.value)).toString() + "px";
  }, false);

buttonBefore.addEventListener("click", function (event) {
  event.preventDefault();
  pictureAfter.style.display = "none";
  pictureBefore.style.display = "block";
  pictureBefore.style.width = "100%";
  pictureAfter.style.width = "0";
  toggle.style.left = "5%";
  range.style.left = "0";
  range.style.right = "inherit";
});

buttonAfter.addEventListener("click", function (event) {
  event.preventDefault();
  pictureBefore.style.display = "none";
  pictureAfter.style.display = "block";
  pictureBefore.style.width = "0";
  pictureAfter.style.width = "100%";
  toggle.style.left = '45%';
  range.style.right = "0";
  range.style.left = "inherit";
});

// Map
let map;
function initMap() {
  let options = {
    zoom: 16,
    center: getMapCenterValue(),
  };

  // New map
  map = new google.maps.Map(document.getElementById('location__map--js'), options);

  // Add marker
  let marker = new google.maps.Marker({
    position:{ lat:59.938635, lng:30.323118},
    map: map,
    icon: '../img/raster/map-pin.png'
  });
}

window.addEventListener('resize', function(event) {
  map.setOptions({
    center: getMapCenterValue()
  });
});

function getMapCenterValue() {
  let centerValue;

  if(window.innerWidth >= 1300) {
    centerValue = { lat:59.9385611, lng:30.3178472 }
  } else {
    centerValue = { lat:59.938635, lng:30.323118 }
  }

  return centerValue;
}
