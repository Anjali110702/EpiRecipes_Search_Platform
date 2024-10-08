

# EpiRecipes Search Platform

Welcome to the **EpiRecipes Search Platform**! This project is a recipe search application that enables users to search for recipes by title, ingredients, and categories. It also allows filtering based on categories, calories, and other attributes. The frontend is built using React, while the backend is powered by Python (Flask) and OpenSearch for indexing and searching recipe data.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup (Flask & OpenSearch)](#backend-setup-flask--opensearch)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The EpiRecipes Search Platform allows users to search for recipes from a large dataset, providing filters for categories and nutritional information. The application mimics the style of an e-commerce site with a fun and user-friendly interface, making it enjoyable to browse through different recipes.

The platform uses **OpenSearch** for indexing the dataset and **Flask** for the backend API, while the **React** frontend presents a dynamic and responsive user experience.

## Features

- Full-text recipe search by title, ingredients, and categories.
- Filtering by category and nutritional values (e.g., calories).
- Pagination for smooth navigation through search results.
- Attractive and user-friendly interface.
- Dashboard to view categorized data and analytics.

## Tech Stack

- **Frontend**: React, React Router DOM, Font Awesome
- **Backend**: Flask, OpenSearch
- **Database/Indexing**: OpenSearch
- **Other Tools**: Docker (for OpenSearch setup), Axios (for API requests), Pandas (for dataset handling)

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Docker](https://www.docker.com/)
- [OpenSearch](https://opensearch.org/) (via Docker)
- A web browser like Google Chrome

## Getting Started

Follow these steps to set up the project locally.

### Backend Setup (Flask & OpenSearch)

1. **Clone the Repository**:
   ```bash
   https://github.com/Anjali110702/EpiRecipes_Search_Platform.git
   cd epirecipes-search-platform
   ```

2. **Set Up OpenSearch via Docker**:
   Use the provided Docker Compose file to set up OpenSearch.
   ```bash
   docker-compose up
   ```
   OpenSearch should now be running at `http://localhost:9200`.

3. **Run the Flask Server**:
   Once dependencies are installed, start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`.

4. **Index the Dataset**:
   Index the recipe dataset into OpenSearch by running the indexing script:
   ```bash
   python index_data.py
   ```

### Frontend Setup (React)

1. **Navigate to the Frontend Folder**:
   In your terminal, navigate to the React project directory:
   ```bash
   cd epirecipes_search
   ```

2. **Install Dependencies**:
   Install the necessary Node.js packages using npm:
   ```bash
   npm install
   ```

3. **Start the React Development Server**:
   Run the React app:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

## Running the Application

Once both the backend and frontend are running, you can visit `http://localhost:3000` in your web browser to use the EpiRecipes Search Platform. From here, you can search for recipes, filter by categories or calories, and explore different recipes with ease.


## Contributing

Contributions are welcome! To contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Push to the branch (`git push origin feature-name`).
5. Submit a pull request.

