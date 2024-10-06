# Mapty OOP Based JavaScript Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Code Structure](#code-structure)
6. [How to Use](#how-to-use)
7. [Future Improvements](#future-improvements)
8. [Live Demo](#live-demo)


## Introduction

Mapty is an Object-Oriented Programming (OOP) based JavaScript project that allows users to track their workouts on a map. It utilizes the Geolocation API and Leaflet library to provide an interactive experience where users can log their running or cycling activities, complete with details such as distance, duration, and pace.

## Features

- **User Location Tracking**: Automatically fetches the user's location to display on a map.
- **Workout Logging**: Users can log running and cycling workouts with details like distance, duration, and cadence.
- **Interactive Map**: Displays workout locations using Leaflet, allowing users to visualize their activities.
- **Local Storage**: Saves workout data in the browser's local storage for persistent access.
- **Responsive Design**: Works on various devices with a user-friendly interface.

## Technologies Used

- **JavaScript**: Main programming language for the project.
- **HTML/CSS**: For structuring and styling the web application.
- **Leaflet**: A leading open-source JavaScript library for mobile-friendly interactive maps.
- **Geolocation API**: For obtaining the user's geographical location.
- **Local Storage**: To store workout data persistently.

## Getting Started

To get started with the Mapty project:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Mapty
   ```

2. Open the `index.html` file in your web browser.

3. Allow location access to see your workouts on the map.

## Code Structure

The project follows an OOP structure with the following classes:

- **Workout**: Base class for all workout types.
- **Running**: Inherits from `Workout` and includes specific properties and methods for running workouts.
- **Cycling**: Inherits from `Workout` and includes specific properties and methods for cycling workouts.
- **App**: Main application class that handles user interactions, data management, and map integration.

## How to Use

1. **Click on the Map**: First, click anywhere on the map to set a location for your workout.
2. **Enter the Values**: Fill in the distance, duration, and relevant fields based on the workout type (running or cycling).

3. **Press the Submit Button**: At the end, press the submit button to log your workout. The workout will then be saved and displayed on the map.

4. **View Logged Workouts**: After submitting, you can see your logged workouts in the list below the map and as markers on the map.

## Future Improvements

- Implement user authentication to save workouts across devices.
- Add a feature to edit or delete logged workouts.
- Enhance the UI/UX for better user experience.
- Integrate additional workout types (e.g., walking, swimming).
- Provide visual analytics on workout performance over time.

## Live Demo

You can view the live demo of the project at the following link: [Mapty OOP Based JavaScript Project](https://mapty-oop-based-javascript-project.vercel.app/)
