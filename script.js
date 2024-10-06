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
///Geo location API
navigator.geolocation.getCurrentPosition(
  function (position) {
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
  },
  function () {
    //if in case of failure
    console.log('fail to fetch');
  }
);

//Handling from  on map
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //   e.preventDefault;

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
/// final toush
