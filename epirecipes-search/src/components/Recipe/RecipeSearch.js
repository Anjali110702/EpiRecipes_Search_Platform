import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeSearch.css';

const defaultURL = 'https://www.verywellfit.com/thmb/WY_NtJB9XE1wZTaKbk2syDPITUc=/3865x2576/filters:fill(FFDB5D,1)/different-types-of-food-on-rustic-wooden-table-861188910-5bd1d6f846e0fb00519d99f9.jpg';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    caloriesMin: '',
    caloriesMax: '',
    ratingMin: '',
    ratingMax: '',
  });
  const [page] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchDefaultRecipes = async () => {
    const response = await axios.get(`http://localhost:5000/filter`, {
      params: {
        caloriesMin: 0,
        caloriesMax: 1000,
      },
    });
    setResults(response.data.results);
  };

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    const response = await axios.get(`http://localhost:5000/search?q=${query}&page=${page}`);
    setResults(response.data.results);
  };

  const handleFilter = async () => {
    const { category, caloriesMin, caloriesMax, ratingMin, ratingMax } = filters;
    const response = await axios.get(`http://localhost:5000/filter`, {
      params: {
        category,
        caloriesMin,
        caloriesMax,
        ratingMin,
        ratingMax,
      },
    });
    setResults(response.data.results);
  };

  const handleMoreInfo = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseInfo = () => {
    setSelectedRecipe(null);
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

      <h1>Filters</h1>
      <div className="filters">
        <input 
          type="text"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          placeholder="Category"
          className="form-control"
        />
        <input 
          type="number"
          value={filters.caloriesMin}
          onChange={(e) => setFilters({ ...filters, caloriesMin: e.target.value })}
          placeholder="Min Calories"
          className="form-control"
        />
        <input 
          type="number"
          value={filters.caloriesMax}
          onChange={(e) => setFilters({ ...filters, caloriesMax: e.target.value })}
          placeholder="Max Calories"
          className="form-control"
        />
        <input 
          type="number"
          value={filters.ratingMin}
          onChange={(e) => setFilters({ ...filters, ratingMin: e.target.value })}
          placeholder="Min Rating"
          className="form-control"
        />
        <input 
          type="number"
          value={filters.ratingMax}
          onChange={(e) => setFilters({ ...filters, ratingMax: e.target.value })}
          placeholder="Max Rating"
          className="form-control"
        />
        <button onClick={handleFilter} className="btn btn-success">Apply Filters</button>
      </div>

      <h3>Available Recipes</h3>
      <div className="row">
        {results.length === 0 ? (
          <p>No recipes found for your search.</p>
        ) : (
          results.map((recipe, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card recipe-card">
                <img 
                  src={recipe.image ? recipe.image : defaultURL} 
                  alt={recipe.title} 
                  className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <button className="btn btn-info" onClick={() => handleMoreInfo(recipe)}>
                    More Information
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseInfo}>&times;</span>
            <center><h2 className="modal-title">{selectedRecipe.title}</h2></center>

            <div className="ingredients">
              <h6><strong>Ingredients:</strong></h6>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="directions">
              <h6><strong>Directions:</strong></h6>
              <ol>
                {selectedRecipe.directions.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ol>
            </div>

            <h6><strong>Recipe Details:</strong></h6>
            <table className="recipe-details">
              <tbody>
                <tr>
                  <td><strong>Calories:</strong></td>
                  <td>{selectedRecipe.calories} kcal</td>
                </tr>
                <tr>
                  <td><strong>Protein:</strong></td>
                  <td>{selectedRecipe.protein} g</td>
                </tr>
                <tr>
                  <td><strong>Fat:</strong></td>
                  <td>{selectedRecipe.fat} g</td>
                </tr>
                <tr>
                  <td><strong>Sodium:</strong></td>
                  <td>{selectedRecipe.sodium} mg</td>
                </tr>
                <tr>
                  <td><strong>Rating:</strong></td>
                  <td>{selectedRecipe.rating } / 5</td>
                </tr>
              </tbody>
            </table>

            <h6>
              <strong>YouTube Link:</strong> 
              <div className='youtube-container'>
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedRecipe.title)} recipe`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="youtube-link"
                >
                  Watch Recipe Video
                </a>
              </div>
            </h6>
            <button className="btn-recipe" onClick={handleCloseInfo}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
