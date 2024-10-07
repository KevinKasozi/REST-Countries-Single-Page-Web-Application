# Countries API App

Welcome to the **Countries API App**! This application displays a list of countries along with their details and allows users to search for countries, view details, and save favorites.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application Locally](#running-the-application-locally)
- [Running the Application Using Docker](#running-the-application-using-docker)

## Features
- View a list of countries with details such as name, capital, population, languages, and currencies.
- Search for countries by name or language.
- View full details of a selected country in a modal.
- Save and view favorite countries.
- Persist favorite countries in local storage.

## Technologies Used
- **Frontend**: React, Ag-Grid
- **Backend**: Python (Flask)
- **Data**: REST Countries API
- **Styling**: CSS

## Installation

1. In the bash terminal run the following command to clone the repository:
    cd COUNTRIES-API-APP

    git clone https://github.com/KevinKasozi/REST-Countries-Single-Page-Web-Application.git
   
2. Navigate to the frontend folder:
    cd frontend

3. Install the frontend dependencies:
    npm install

4. Navigate to the backend directory
    cd ../backend

5.Create a virtual environment and activate it (optional but recommended):
    python3 -m venv venv

    source venv/bin/activate  # On Windows: venv\Scripts\activate

6. Install all backend dependencies. I have created a requirements file containing these:

    pip install -r requirements.txt

##  Running the App Locally
I recommend opening two terminals for this. One to run the backend Server and One to run the front end server.

1. Open new terminal for backend server

2.Start the Flask backend API:

    cd backend

    flask run

3. Open another terminal terminal, start the React frontend:

    cd frontend

    npm start

3. Open your browser and go to http://localhost:5173/REST-Countries-Single-Page-Web-Application/ to view the application.

##  Running the App via Docker

To run both the backend and frontend in Docker containers:

1. Navigate to the root directory of the project where the docker compose yaml file is located.

2.Build and Run the application using the following command: 

    docker-compose up --build

3. Access the application with the following link produced:

    http://localhost:3000/REST-Countries-Single-Page-Web-Application/

    If you want to access the backend server api use this link :
    
    http://localhost:8080/api/countries
