import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AddPartCategory.css'

const AddPartCategoryPage = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5051/api/PartCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
                },
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setName(''); 
            navigate("/partCategories");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='add-category-container'>
        <h1 className='page-name-add'>Add Part Category</h1>
        <div className='add-category-placeholder'>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Category Name:</label>
                    <input
                        autoComplete = "off"
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required

                    />
                
                <button className='add-button' type="submit">Add Category</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddPartCategoryPage;