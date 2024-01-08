import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPartPage.css'; 

const EditPartPage = () => {
    const [partData, setPartData] = useState({ name: '', description: '', price: '' });
    const { categoryId, partId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPart = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}/Parts/${partId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const part = await response.json();
                setPartData({ name: part.name, description: part.description, price: part.price });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchPart();
    }, [categoryId, partId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}/Parts/${partId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(partData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/partCategories/${categoryId}/Parts/${partId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='edit-part-container'>
            <h1>Edit Part</h1>
            <div className='edit-part-placeholder'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Part Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={partData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={partData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={partData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='edit-part-button' type="submit">Update Part</button>
                </form>

            </div>
        </div>
    );
};

export default EditPartPage;