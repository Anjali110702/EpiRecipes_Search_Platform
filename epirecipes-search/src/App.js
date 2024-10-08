import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeSearch from './components/Recipe/RecipeSearch';
import IndexPage from './components/IndexPage/IndexPage';
import AboutPage from './components/AboutPage/AboutPage';
import Dashboard from './components/Dashboard'; // Import the new component
import './App.css'; 
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <Router>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        
                    </ul>
                </nav>
            </header>  

            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/search" element={<RecipeSearch />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Add the new route */}
            </Routes>
            <footer>
                <Footer />
            </footer>
        </Router>
    );
};

export default App;
