import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import './PrebuildsDetails.css';

const PrebuildsDetails = () => {
    const [prebuild, setPrebuild] = useState(null);
    const { prebuildID } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPrebuild = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); 
                const response = await fetch(`http://localhost:5051/api/Prebuilds/${prebuildID}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPrebuild(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchPrebuild();
    }, [prebuildID]);
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
        navigate(`/prebuilds/${prebuildID}/edit`); 
    };
    
    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/Prebuilds/${prebuildID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/Prebuilds`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleAddPart = async () => {
            navigate(`/Prebuilds/${prebuildID}/addPart`);
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
        <div className="prebuild-details-container"  style={{marginTop: 30}}>
            {prebuild ? (
                <div>
                    <h1 className="prebuild-name">{prebuild.name}</h1>
                    <p className="prebuild-description">{prebuild.description}</p>
                    <div className="prebuild-price">Price: ${prebuild.price.toFixed(2)}</div>
                    <div className="prebuild-parts-list">
                        <h2>Parts Included:</h2>
                        <ul>
                            {prebuild.parts.map(part => (
                                <li key={part.id} className="part-item">
                                    <div className="part-name">{part.name}</div>
                                    <div className="part-description">{part.description}</div>
                                    <div className="part-price">${part.price.toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {isAdmin() && <button onClick={handleEdit} className='part-edit-button'>Edit</button>}
            {isAdmin() && <button onClick={handleAddPart} className='prebuild-add-button'>AddPart</button>}
            {isAdmin() && <button onClick={() => setShowModal(true)} className='delete-button'>Delete Prebuild</button>}
                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this prebuild?"
                />
        </div>
    );
};

export default PrebuildsDetails;