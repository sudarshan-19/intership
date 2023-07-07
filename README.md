Front-End Web Developer Task - React Web App
This repository contains the solution for the Front-End Web Developer task. It is a React web application that integrates with an API endpoint to fetch data and display it using Material-UI components. The application is responsive and includes attractive UI design.

Task Description
The task was to create a React web app that interacts with the provided API endpoint (https://api.gyanibooks.com/library/get_dummy_notes). The app needed to make a GET request to fetch data and display it using Material-UI components. The requirements also included ensuring responsiveness and utilizing Material-UI throughout the project.

Solution Overview
The solution consists of a React web application that uses Material-UI for the UI components and styling. It fetches data from the API endpoint and renders it in a responsive layout. Each data item is displayed as a card with title, body, rating, duration, and author information. The user can click the like button to show appreciation for a note. Additionally, a Snackbar component is used to display a message when the like button is clicked.

Technologies Used
The project utilizes the following technologies and libraries:

React: JavaScript library for building user interfaces.
Material-UI: React UI framework for designing attractive and responsive web applications.
Axios: JavaScript library for making HTTP requests.
react-dnd: React library for implementing drag and drop functionality.
react-dnd-html5-backend: HTML5 backend for react-dnd library.
Getting Started
To get started with the project, follow these steps:

├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Card.js
│   │   ├── Snackbar.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
└── ...
