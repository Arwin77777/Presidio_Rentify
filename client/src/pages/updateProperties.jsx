import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        location: '',
        bedrooms: '',
        bathrooms: '',
        price: '',
        amenities: [],
        proximityToHospitals: false,
        proximityToColleges: false,
        description: '',
        images: [],
        available: false
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                const response = await axios.get(`http://localhost:3000/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProperty(response.data);
            };
            fetchProperty();
        }
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "amenities") {
            setProperty(prevState => ({
                ...prevState,
                amenities: value.split(',')
            }));
        } else if (name === "images") {
            setProperty(prevState => ({
                ...prevState,
                images: value.split(',')
            }));
        } else {
            setProperty(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProperty(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = id ? `http://localhost:3000/properties/${id}` : 'http://localhost:3000/properties';
        const method = id ? 'put' : 'post';

        try {
            await axios({
                method: method,
                url: url,
                data: property,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/seller-properties');
        } catch (error) {
            console.error('Failed to submit property:', error);
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Update Property' : 'Add New Property'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Location:
                    <input type="text" name="location" value={property.location} onChange={handleChange} />
                </label>
                <label>
                    Bedrooms:
                    <input type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} />
                </label>
                <label>
                    Bathrooms:
                    <input type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={property.price} onChange={handleChange} />
                </label>
                <label>
                    Amenities (comma separated):
                    <input type="text" name="amenities" value={property.amenities.join(',')} onChange={handleChange} />
                </label>
                <label>
                    Proximity to Hospitals:
                    <input type="checkbox" name="proximityToHospitals" checked={property.proximityToHospitals} onChange={handleCheckboxChange} />
                </label>
                <label>
                    Proximity to Colleges:
                    <input type="checkbox" name="proximityToColleges" checked={property.proximityToColleges} onChange={handleCheckboxChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={property.description} onChange={handleChange} />
                </label>
                <label>
                    Images (comma separated URLs):
                    <input type="text" name="images" value={property.images.join(',')} onChange={handleChange} />
                </label>
                <label>
                    Available:
                    <input type="checkbox" name="available" checked={property.available} onChange={handleCheckboxChange} />
                </label>
                <button type="submit">{id ? 'Update Property' : 'Add Property'}</button>
            </form>
        </div>
    );
}
export default UpdateProperty;