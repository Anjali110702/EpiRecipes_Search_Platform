import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Recipe Search</h1>
      
      {/* Search Input */}
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Filters */}
      <h3>Filters</h3>
      <input 
        type="text"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        placeholder="Category"
      />
      <input 
        type="text"
        value={filters.cuisine}
        onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
        placeholder="Cuisine"
      />
      <input 
        type="number"
        value={filters.prep_time}
        onChange={(e) => setFilters({ ...filters, prep_time: e.target.value })}
        placeholder="Prep Time (mins)"
      />
      <button onClick={handleFilter}>Apply Filters</button>

      {/* Display Search Results */}
      <div>
        {results.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.title}</h2>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Categories: {recipe.categories.join(', ')}</p>
            <p>Prep Time: {recipe.prep_time} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
