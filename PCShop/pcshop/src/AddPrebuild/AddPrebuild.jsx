import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPrebuild.css'; 

const AddPrebuildPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5051/api/Prebuilds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                },
                body: JSON.stringify({ name, price, description }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/prebuilds'); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-prebuild-container">
            <h1>Add New Prebuild</h1>
            <div className='add-part-placeholder'>
            <form onSubmit={handleSubmit} className="add-prebuild-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <button className='add-part-button' type="submit">Add Prebuild</button>
            </form>
            </div>
        </div>
    );
    
};

export default AddPrebuildPage;