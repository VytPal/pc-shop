import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPrebuild.css';

const EditPrebuildPage = () => {
    const [prebuildData, setPrebuildData] = useState({ name: '', description: '', price: '' });
    const { prebuildID } = useParams();
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

                const prebuild = await response.json();
                setPrebuildData({ name: prebuild.name, description: prebuild.description, price: prebuild.price });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchPrebuild();
    }, [prebuildID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrebuildData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/Prebuilds/${prebuildID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(prebuildData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/PrebuildsDetails/${prebuildID}`); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='edit-prebuild-container'>
            <h1>Edit Prebuild</h1>
            <div className='edit-prebuild-placeholder'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Prebuild Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={prebuildData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={prebuildData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={prebuildData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='edit-prebuild-button' type="submit">Update Prebuild</button>
                </form>
            </div>
        </div>
    );
};

export default EditPrebuildPage;