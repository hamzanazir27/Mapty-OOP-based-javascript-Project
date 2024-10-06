'use strict';
const btn = document.querySelector('.btn-reset');
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
  clicks = 0;
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(distance, duration, cords) {
    this.distance = distance;
    this.duration = duration;
    this.cords = cords;
  }
  _setDiscription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.discription = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(cords, distance, duration, cadence) {
    super(distance, duration, cords);
    this.cadence = cadence;
    this.clacPace();
    this._setDiscription();
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
    this._setDiscription();
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
  #workOut = []; //Array that consist of all workouts
  constructor() {
    //get position
    this._getPosition();
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener(
      'change',
      this._getTogelElivstionField.bind(this)
    );
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    this.#workOut.forEach(work => {
      this._randerWorkoutMarker(work);
    });
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
  _hideform() {
    inputDistance.value =
      inputElevation.value =
      inputCadence.value =
      inputDuration.value =
        '';
    form.computedStyleMap.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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
    this._randerWorkout(workout);

    //rander workout Marker
    this._randerWorkoutMarker(workout);
    //hide form + clear input field
    this._hideform();

    //local storage
    this._localStorage();

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
      .setPopupContent(
        `${Workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.discription}`
      )
      .openPopup();
  }
  _randerWorkout(Workout) {
    let html = `<li class="workout workout--${Workout.type}" data-id="${
      Workout.id
    }">
          <h2 class="workout__title">${Workout.discription}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              Workout.type === 'running' ? '🏃' : '🚴‍♀️'
            }</span>
            <span class="workout__value"> ${Workout.distance} </span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${Workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (Workout.type === 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${Workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${Workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (Workout.type === 'cycling') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${Workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${Workout.evelationgain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEL = e.target.closest('.workout');

    if (!workoutEL) return;
    const workout = this.#workOut.find(
      work => work.id === workoutEL.dataset.id
    );
    this.#map.setView(workout.cords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    //using the public interface
    // workout.click();
    // console.log(this.#clicks);
    // console.log(workout);
  }
  _localStorage() {
    localStorage.setItem('workout', JSON.stringify(this.#workOut));
  }
  _getLocalStorage() {
    let data = JSON.parse(localStorage.getItem('workout'));
    if (!data) return;
    this.#workOut = data;
    this.#workOut.forEach(work => {
      this._randerWorkout(work);
    });
  }
  rest() {
    localStorage.removeItem('workout');
    location.reload();
  }
}
const app = new App();
btn.addEventListener('click', app.rest);
