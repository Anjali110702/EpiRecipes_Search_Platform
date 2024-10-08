import React from 'react';
import './dashboard.css';
const Dashboard = () => {
    const excelFileLink = "https://1drv.ms/x/s!AimrVVOgTjDBiMsbeGKnj4gUFmZlhg?e=4cXGEc"

    return (
        <section>
            <img className="img" src="https://backiee.com/static/wpdb/wallpapers/1920x1080/183116.jpg" alt="bg" />
            <div className="main-container">
            <div className="content-container">
       
            <h2>Excel Dashboard</h2>
            <p>Here you can view and download the Excel dashboard:</p>
            <a href={excelFileLink} target="_blank" rel="noopener noreferrer">
                View Dashboard
            </a>
           </div>
        </div>
        </section>
    );
};

export default Dashboard;
