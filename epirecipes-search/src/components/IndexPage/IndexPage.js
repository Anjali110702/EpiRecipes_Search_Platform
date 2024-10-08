import React from 'react';
import './Indexstyle.css';
// import { FaUtensils } from 'react-icons/fa'; 

const IndexPage = () => {
    return (
        <section>
            <img className="img" src="https://backiee.com/static/wpdb/wallpapers/1920x1080/183116.jpg" alt="bg" />
            <div className="main-container">
                <div className="content-container">
                    <h1>
                        Welcome to Tasteful Treasures!
                    </h1>
                    <p>
                        Explore a variety of recipes, find cooking tips, and share your culinary experiences.
                    </p>
                    <a href="/search" className="search-button">Explore</a>
                </div>
            </div>
        </section>
    );
};

export default IndexPage;
