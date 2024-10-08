import React from 'react';
import './AboutPage.css'; // Import your CSS file
const AboutPage = () => {
    return (
        <section>
        <div>
        <img src="https://thumbs.dreamstime.com/b/culinary-background-recipes-frame-fresh-vegetables-ingredients-cooking-food-copy-space-table-menu-place-text-168640058.jpg" alt='bg'/>
        </div>
        
        <div className="cont">

            <h1>About This Application</h1>
            <p>This Recipe Search application allows users to search for recipes based on ingredients, categories, and more. It's built using React, Axios for API requests, and has a user-friendly interface for easy navigation.</p>
            <p>Version: 1.0.0</p>
        </div>
        </section>
    );
};

export default AboutPage;
