import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from '../../../assets/Logo/Edu_logo.png'; 

const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    const handleFontSizeChange = (e) => {
        const value = parseInt(e.target.value);
        setFontSize(value);

        // Update the background to reflect the slider position
        const fillPercentage = ((value - 18) / (30 - 18)) * 100;  // Calculate percentage for the background fill
        e.target.style.background = `linear-gradient(to right, #00e1ff ${fillPercentage}%, #ffffff ${fillPercentage}%)`;
    };

    // Use useEffect to set the initial state of the background when the component mounts
    useEffect(() => {
        const fillPercentage = ((fontSize - 18) / (30 - 18)) * 100;  // Initialize gradient based on initial value
        document.querySelector('input[type="range"]').style.background = `linear-gradient(to right, #00e1ff ${fillPercentage}%, #ffffff ${fillPercentage}%)`;
    }, [fontSize]);

    return (
        <div className="navbar">
            {/* Display the logo image */}
            <img src={logo} alt="Logo" className="navbar-logo" />

            <Select
                options={languages}
                value={languages.find(lang => lang.value === userLang)}
                onChange={(e) => setUserLang(e.value)}
                placeholder="Language"
                aria-label="Select Language"
            />
            <Select
                options={themes}
                value={themes.find(theme => theme.value === userTheme)}
                onChange={(e) => setUserTheme(e.value)}
                placeholder="Theme"
                aria-label="Select Theme"
            />
            <label>Font Size</label>
            <input
                type="range"
                min="18"
                max="30"
                value={fontSize}
                step="2"
                onChange={handleFontSizeChange}
                aria-label="Set Font Size"
            />
        </div>
    );
};

export default Navbar;