import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import IndexPage from './IndexPage';
import AboutPage from './AboutPage';
import './App.css'; 

const App = () => {
    return (
        <Router>
          <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/search">Recipe Search</Link></li>
                    <li><Link to="/dashboards">Dashboard</Link></li>
                </ul>
          
            </nav>
            </header>  
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/search" element={<RecipeSearch />} />
            </Routes>
        </Router>
    );
};

export default App;
