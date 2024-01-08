import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; 
import './PartDetailsPage.css';

const PartDetailsPage = () => {
    const [part, setPart] = useState(null);
    const { id, partID } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPart = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); 
                const response = await fetch(`http://localhost:5051/api/PartCategories/${id}/Parts/${partID}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPart(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchPart();
    }, [id, partID]);

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
    const handleEdit = () => {
        navigate(`/partCategories/${id}/parts/${partID}/edit`); 
    };
    
    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/PartCategories/${id}/Parts/${partID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/partCategories/${id}/Parts`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
        if (!isOpen) return null;

        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <p>{message}</p>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        );
    };
    return (
        <div>
        <div className="part-details-container"  style={{marginTop: 30}}>
            {part ? (
                <div className="part-details">
                    <h1 className="part-name">{part.name}</h1>
                    <p className="part-description-details">{part.description}</p>
                    <div className="part-category">Category: {part.partCategory.name}</div>
                    <div className="part-price">Price: ${part.price.toFixed(2)}</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {isAdmin() &&  <button onClick={handleEdit} className='part-edit-button'>Edit</button>}
            {isAdmin() && <button onClick={() => setShowModal(true)} className='delete-button'>Delete Part</button>}
                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this part?"
                />
                
        </div>
        
        </div>
    );
};

export default PartDetailsPage;