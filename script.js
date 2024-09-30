'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

/// refactoring
class App {
  constructor() {
    //1
    this._getPosition();
  }
  _getPosition() {
    ///Geo location API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._getLoadMap.bind(this),
        function () {
          //if in case of failure
          console.log('fail to fetch');
        }
      );
    }
  }

  _getLoadMap(position) {
    //In case of sucess
    const { longitude } = position.coords;
    const { latitude } = position.coords;
    const cords = [latitude, longitude];
    map = L.map('map').setView(cords, 13);
    //https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(cords).addTo(map).bindPopup('WorkOut').openPopup();

    //Handling click  on map -----------------------------------------------||

    map.on('click', function (e) {
      mapEvent = e;
      form.classList.remove('hidden');
      inputDistance.focus();
      inputDistance.value =
        inputElevation.value =
        inputCadence.value =
        inputDuration.value =
          '';
    });
  }
  _getShowForm() {}
  _getTogelElivstionField() {}
}

//Handling from  on map
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //   e.preventDefault;

  // console.log('form sttable');
  const { lat, lng } = mapEvent.latlng;
  //   console.log(lat, lng);
  //   ADDING MARKER WHEN USER CLICK
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        minWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('workout')
    .openPopup();
});
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
