import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddPartPrebuild.css';
const AddPartToPrebuildPage = () => {
    const [partData, setPartData] = useState({
        name: '',
        price: 0,
        description: '',
        partCategoryID: 0
    });
    const { prebuildId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartData({ ...partData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/Prebuilds/api/Prebuild/${prebuildId}/PostPart/Prebuilds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(partData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/PrebuildsDetails/${prebuildId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        const fetchPartCategories = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch('http://localhost:5051/api/PartCategories', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPartCategories(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPartCategories();
    }, []);
    const [partCategories, setPartCategories] = useState([]);
    return (
        <div className="add-part-to-prebuild-container">
            <h1>Add Part to Prebuild</h1>
            <div className='add-part-to-prebuild-placeholder'>
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
                <div>
                    <label htmlFor="partCategoryID">Part Category:</label>
                    <select
                            id="partCategoryID"
                            name="partCategoryID"
                            value={partData.partCategoryID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Category</option>
                            {partCategories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                </div>
                <button className='edit-prebuild-button' type="submit">Add Part</button>
            </form>
        </div>
        </div>
    );
};

export default AddPartToPrebuildPage;