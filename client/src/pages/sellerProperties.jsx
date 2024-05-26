import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerProperties = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        const response = await axios.get('http://localhost:3000/seller',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setProperties(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/properties/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            fetchProperties();  // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete property:', error);
        }
    };

    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/update-property/${id}`);
    };

    const handleAdd = () => {
        navigate('/add-property');
    };

    return (
        <div>
            <h1>Seller Properties</h1>
            <button onClick={handleAdd}>Add New Property</button>
            <div>
    {properties.map(property => (
        <div key={property._id}>
            <p>Location: {property.location}</p>
            <p>Description: {property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Amenities: {property.amenities.join(', ')}</p>
            <p>Proximity to Hospitals: {property.proximityToHospitals ? 'Yes' : 'No'}</p>
            <p>Proximity to Colleges: {property.proximityToColleges ? 'Yes' : 'No'}</p>
            <p>Available: {property.available ? 'Yes' : 'No'}</p>
            <div>
                Images: 
                {property.images.map((image, index) => (
                    <img key={index} src={image} alt={`Property at ${property.location}`} style={{ width: '100px', height: '100px' }} />
                ))}
            </div>
            <button onClick={() => handleUpdate(property._id)}>Update</button>
            <button onClick={() => handleDelete(property._id)}>Delete</button>
        </div>
    ))}
</div>
        </div>
    );
};

export default SellerProperties;
       