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

// let map, mapEvent;
/////////////////////////////////////////////////////---class workout--/////////////////////////////////////////////////
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(distance, duration, cords) {
    this.distance = distance;
    this.duration = duration;
    this.cords = cords;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(cords, distance, duration, cadence) {
    super(distance, duration, cords);
    this.cadence = cadence;
    this.clacPace();
  }
  clacPace() {
    //min/km
    this.pace = this.duration / this.distance;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(cords, distance, duration, evelationgain) {
    super(distance, duration, cords);
    this.evelationgain = evelationgain;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
  }
}
// const run1 = new Running([12, -12], 23, 423, 12);
// const cycling1 = new Running([12, -13], 343, 4323, 122);
// console.log(run1, cycling1);
// console.log(run1, cycling1);

/// refactoring
// cont

///////////////////////////////////////////////////////------APP CLASS------/////////////////////////////////////////////////////////////////
class App {
  #map;
  #mapEvent;
  #workOut = [];
  constructor() {
    //1
    this._getPosition();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener(
      'change',
      this._getTogelElivstionField.bind(this)
    );
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
    this.#map = L.map('map').setView(cords, 13);
    //https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(cords).addTo(this.#map).bindPopup('WorkOut').openPopup();

    //Handling click  on map
    this.#map.on('click', this._getShowForm.bind(this));

    // -----------------------------------------------||
  }
  _getShowForm(e) {
    // e.preventDefault();
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
    // clear input field
    inputDistance.value =
      inputElevation.value =
      inputCadence.value =
      inputDuration.value =
        '';
  }
  _getTogelElivstionField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkOut(e) {
    e.preventDefault();

    // check data from form
    const type = inputType.value;
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    const isValid = (...el) => el.every(vl => Number.isFinite(vl));
    const isPositive = (...el) => el.every(vl => vl > 0);
    // if activity running ,create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        !isValid(duration, distance, cadence) ||
        !isPositive(duration, distance, cadence)
      ) {
        return alert('value is not correct');
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    //if activity cycling , create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //check if data is valid
      if (
        !isValid(duration, distance, elevation) ||
        !isPositive(duration, distance)
      )
        return alert('value is not correct');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //Add work out to new object marker
    this.#workOut.push(workout);

    //Rander workout as a marker

    ///////
    /////////
    //   console.log(lat, lng);

    // rander workout list

    //rander workout Marker
    this._randerWorkoutMarker(workout);
    //hide form + clear input field
    inputDistance.value =
      inputElevation.value =
      inputCadence.value =
      inputDuration.value =
        '';

    ///////////////////////////
  }

  _randerWorkoutMarker(workout) {
    //   ADDING MARKER WHEN USER CLICK
    L.marker(workout.cords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('workout')
      .openPopup();
  }
}
const app = new App();
