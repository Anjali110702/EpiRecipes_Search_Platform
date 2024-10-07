import React, { useState } from 'react';
import axios from 'axios';
import './RecipeSearch.css'; // Import your CSS file

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ category: '', cuisine: '', prep_time: '' });
  const [page, setPage] = useState(1);

  // Function to handle search
  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:5000/search?q=${query}&page=${page}`);
    setResults(response.data.results);
  };

  // Function to handle filters
  const handleFilter = async () => {
    const { category, cuisine, prep_time } = filters;
    const response = await axios.get(`http://localhost:5000/filter?category=${category}&cuisine=${cuisine}&prep_time=${prep_time}`);
    setResults(response.data.results);
  };

  return (
    <div className="recipe-search-container">
      <h1 className="text-center">Recipe Search</h1>
      
      <div className="search-bar">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {/* Filters */}
      <h3>Filters</h3>
      <div className="filters">
        <input 
          type="text"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          placeholder="Category"
          className="form-control"
        />
        <input 
          type="text"
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
          placeholder="Cuisine"
          className="form-control"
        />
        <button onClick={handleFilter} className="btn btn-success">Apply Filters</button>
      </div>

      {/* Display Search Results */}
      <div className="row">
        {results.map((recipe, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card recipe-card">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  Ingredients: {recipe.ingredients?.length ? recipe.ingredients.join(', ') : 'N/A'}
                </p>
                <p className="card-text">
                  Categories: {recipe.categories?.length ? recipe.categories.join(', ') : 'N/A'}
                </p>
                <p className="card-text">
                  Directions: {recipe.directions?.length ? recipe.directions.join('. ') : 'N/A'}
                </p>
                <p className="card-text"><strong>Calories:</strong> {recipe.calories} kcal</p>
                <p className="card-text"><strong>Protein:</strong> {recipe.protein} g</p>
                <p className="card-text"><strong>Fat:</strong> {recipe.fat} g</p>
                <p className="card-text"><strong>Sodium:</strong> {recipe.sodium} mg</p>
                <p className="card-text"><strong>Rating:</strong> {recipe.rating} / 5</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
