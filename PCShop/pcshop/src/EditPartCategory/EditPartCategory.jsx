import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../AddPartCategory/AddPartCategory.css'
import './EditPartCategory.css'
const EditPartCategoryPage = () => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const category = await response.json();
                setName(category.name);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/partCategories');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5051/api/PartCategories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/partCategories');
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

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='add-category-container'>
            <h1 className='page-name-add'>Edit Part Category</h1>
            <div className='add-category-placeholder'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Category Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <button className='add-button' type="submit">Update Category</button>
                    </div>
                </form>
                <button onClick={() => setShowModal(true)} className='delete-button'>Delete Category</button>
                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    message="Are you sure you want to delete this category?"
                />
            </div>
        </div>
    );
};

export default EditPartCategoryPage;