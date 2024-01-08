import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import './PcPartCategories.css';

const PartCategories = () => {
    const [parts, setParts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchParts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); 
                const response = await fetch('http://localhost:5051/api/PartCategories', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });

                if (!response.ok) {
                    navigate("/login")
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setParts(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchParts();
    }, []);

    const isAdmin = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return false;
        try {
            const decodedToken = jwtDecode(accessToken);
            const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            return roles && roles.includes('Admin');
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    };

    return (
        <div className="parts-container">
            <h1>PC Part Categories</h1>
            <ul className="parts-list">
                {parts.map(partCategory => (
                    <li key={partCategory.id}>
                        <div className="part-category-content">
                            <Link to={`/partCategories/${partCategory.id}/Parts`} className="category-link">
                                {partCategory.name}
                            </Link>
                       
                            {isAdmin() && <Link to={`/partCategories/edit/${partCategory.id}`} className="additional-content">Edit</Link>}
                        </div>
                    
                    </li>
                ))}
                {isAdmin() && <li>  <Link className='part-add-button' to={`/partCategories/add`}>+</Link></li>}
            </ul>
        </div>
    );
};

export default PartCategories;