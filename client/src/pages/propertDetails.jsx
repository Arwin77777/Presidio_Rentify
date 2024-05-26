import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/properties/${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                setProperty(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch property details');
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!property) return <div>Property not found.</div>;

    return (
        <div className="container mt-5">
            <h1>{property.location}</h1>
            <div>
                <strong>Price:</strong> ${property.price}
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
                <p><strong>Available:</strong> {property.available ? 'Yes' : 'No'}</p>
                {property.seller && (
                    <div>
                        <h4>Seller Details</h4>
                        <p><strong>Name:</strong> {property.seller.firstName}</p>
                        <p><strong>Email:</strong> {property.seller.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetails;