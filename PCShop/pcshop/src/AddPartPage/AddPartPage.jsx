import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddPartPage.css';

const AddPartPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}/Parts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, description, price, partCategoryId: categoryId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/partCategories/${categoryId}/Parts`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='add-category-container'>
            <h1>Add New Part</h1>
            <div className="add-part-card">
                <form onSubmit={handleSubmit}>
                    
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    
                    
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    
                    
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    
                    <button className='add-part-button' type="submit">Add Part</button>
                </form>
            </div>
        </div>
    );
};

export default AddPartPage;