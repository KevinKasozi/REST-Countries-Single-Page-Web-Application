# Countries API App

Welcome to the **Countries API App**! This application displays a list of countries along with their details and allows users to search for countries, view details, and save favorites.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application Locally](#running-the-application-locally)
- [Running the Application Using Docker](#running-the-application-using-docker)
- [Contributing](#contributing)
- [License](#license)

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

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd countries-api-app
2. Navigate to the frontend folder:
    cd frontend
3. Install the frontend dependencies:
    npm install
4. Navigate to the backend directory
    cd ../backend
5.Create a virtual environment and activate it (optional but recommended):
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
6. Install all backend dependencies. i have created a requirements file containing these:
    pip install -r requirements.txt

##  Running the App Locally

1. Start the Flask backend API:
    cd backend
    flask run
2. Open another terminal terminal, start the React frontend:
    cd frontend
    npm start
3. Open your browser and go to http://localhost:5173/REST-Countries-Single-Page-Web-Application/ to view the application.

##  Running the App via Docker

To run both the backend and frontend in Docker containers:

1. Navigate to the root directory of the project.

2. Build the Docker image:
    docker build -t countries-api-app .

3. Run the Docker container:
    docker run -p 3000:3000 -p 8080:8080 countries-api-app

4. Open your browser and go to http://localhost:3000 to view the app. The backend API will be running on http://localhost:8080.



