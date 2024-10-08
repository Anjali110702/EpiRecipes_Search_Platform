EpiRecipes Search Platform
Welcome to the EpiRecipes Search Platform! This project is a recipe search application that enables users to search for recipes by title, ingredients, and categories. It also allows filtering based on categories, calories, and other attributes. The frontend is built using React, while the backend is powered by Python (Flask) and OpenSearch for indexing and searching recipe data.

Table of Contents
Project Overview
Features
Tech Stack
Prerequisites
Getting Started
Backend Setup (Flask & OpenSearch)
Frontend Setup (React)
Running the Application
Screenshots
Contributing
License
Project Overview
The EpiRecipes Search Platform allows users to search for recipes from a large dataset, providing filters for categories and nutritional information. The application mimics the style of an e-commerce site with a fun and user-friendly interface, making it enjoyable to browse through different recipes.
The platform uses OpenSearch for indexing the dataset and Flask for the backend API, while the React frontend presents a dynamic and responsive user experience.

Features
Full-text recipe search by title, ingredients, and categories.
Filtering by category and nutritional values (e.g., calories).
Pagination for smooth navigation through search results.
Attractive and user-friendly interface.
Dashboard to view categorized data and analytics.
Tech Stack
Frontend: React, React Router DOM, Font Awesome
Backend: Flask, OpenSearch
Database/Indexing: OpenSearch
Other Tools: Docker (for OpenSearch setup), Axios (for API requests), Pandas (for dataset handling)
Prerequisites
Before you begin, make sure you have the following installed:
Node.js (v14 or higher)
Python (v3.8 or higher)
Docker
OpenSearch (via Docker)
A web browser like Google Chrome

Getting Started
Follow these steps to set up the project locally.

Backend Setup (Flask & OpenSearch)
Clone the Repository:

git clone https://github.com/your-username/epirecipes-search-platform.git
cd epirecipes-search-platform
Set Up OpenSearch via Docker: Use the provided Docker Compose file to set up OpenSearch.


docker-compose up
OpenSearch should now be running at http://localhost:9200.

Install Python Dependencies: Navigate to the backend folder and install the required Python packages:
Run the Flask Server: Once dependencies are installed, start the Flask server:

python app.py
The backend will run on http://localhost:5000.

Index the Dataset: Index the recipe dataset into OpenSearch by running the indexing script:
python index_large_recipes.py

Frontend Setup (React)
Navigate to the Frontend Folder: In your terminal, navigate to the React project directory:


cd epirecipes-search
Install Dependencies: Install the necessary Node.js packages using npm:


npm install
Start the React Development Server: Run the React app:


npm start
The frontend will be available at http://localhost:3000.

Running the Application
Once both the backend and frontend are running, you can visit http://localhost:3000 in your web browser to use the EpiRecipes Search Platform. From here, you can search for recipes, filter by categories or calories, and explore different recipes with ease.

Screenshots
Include screenshots of your project to give users a visual of what the platform looks like. Here’s an example of how to format them:



Contributing
Contributions are welcome! To contribute to the project:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes.
Push to the branch (git push origin feature-name).
Submit a pull request.
