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

let slider = document.querySelector(".example__illustration");
let pictureBefore = document.querySelector(".example__picture--before");
let pictureAfter = document.querySelector(".example__picture--after");
let switcher = document.getElementById("switcher");
let range = document.querySelector(".slider__range-control");
let buttonBefore = document.querySelector(".slider__button--before");
let buttonAfter = document.querySelector(".slider__button--after");
let imgBefore = document.querySelector(".example__image-before");
let imgAfter = document.querySelector(".example__image-after");

buttonBefore.addEventListener("click", function (event) {
  event.preventDefault();
  // if ()
  pictureBefore.style.width = "100%";
  pictureAfter.style.width = "0";
  range.style.marginLeft = "0";
});

buttonAfter.addEventListener("click", function (event) {
  event.preventDefault();
  pictureAfter.style.width = "100%";
  pictureBefore.style.width = "0";
  // range.style.marginLeft = "35px";
  imgAfter.style.display = "block";
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
