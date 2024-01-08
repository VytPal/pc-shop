import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './PartsPage.css'; 

const PartsPage = () => {
    const [parts, setParts] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); 
                const response = await fetch(`http://localhost:5051/api/PartCategories/${id}/Parts`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setParts(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchParts();
    }, [id]);

    const trimDescription = (description) => {
        return description.length > 600 ? description.substring(0, 600) + '...' : description;
    };
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
            <h1>PC Parts</h1>
            <ul className="parts-list">
                {parts.map(part => (
                    <li key={part.id} className="part-card">
                        <Link to={`/partCategories/${id}/parts/${part.id}`}>
                            <div className="part-name">{part.name}</div>
                            <div className="parts-description">{trimDescription(part.description)}</div>
                            <div className="part-category">Category: {part.partCategory.name}</div>
                            <div className="part-price">${part.price.toFixed(2)}</div>
                        </Link>
                    </li>
                ))}
                {isAdmin() && <li>  <Link className='add-parts-button' to={`/partCategories/${id}/addPart`}>+</Link></li>}
            </ul>
        </div>
    );
};

export default PartsPage;