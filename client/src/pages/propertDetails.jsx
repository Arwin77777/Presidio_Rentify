import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser' 
import {jwtDecode} from 'jwt-decode';
const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    // const username = localStorage.getItem('username');
    function sendEmail(e)
    {
        const details = e;
        const decoded = jwtDecode(token);
        const name = decoded.username;
        const phoneNumber = decoded.phoneNumber;
        
        details.username = name;
        details.phoneNumber = phoneNumber;
        console.log(details);
        emailjs.send('service_ju8t5tr',
        'template_w2gng7d',
        details,
        'xNwQn8UBjxDukCjle'
        ).then(res=>{
        console.log(res);
        alert("Your message has been sent!");
        }).catch(err=>console.log(err))

        
    }

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`https://presidio-rentify-4xlt-kkwhjri8q-azack77s-projects.vercel.app/properties/${id}`,
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
            <button onClick={()=>sendEmail(property)}>Contact</button>
        </div>
    );
};

export default PropertyDetails;