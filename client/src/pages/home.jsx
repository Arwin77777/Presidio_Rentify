import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem('token');
  const username = token ? jwtDecode(token).firstName : null; // Assuming the token has a username field

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">PropertyApp</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">{username || 'Guest'}</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 className="mb-4">Home</h1>
        <div className="row">
          {properties.length > 0 ? (
            properties.map(property => (
              <div className="col-md-4 mb-4" key={property._id}>
                <div className="card">
                  <Slider {...settings}>
                    {property.images.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt="Property" className="d-block w-100" />
                      </div>
                    ))}
                  </Slider>
                  <div className="card-body">
                    <h5 className="card-title">{property.location}</h5>
                    <p className="card-text">Bedrooms: {property.bedrooms}</p>
                    <p className="card-text">Bathrooms: {property.bathrooms}</p>
                    <p className="card-text">Price: ${property.price}</p>
                    <p className="card-text">Description: {property.description}</p>
                    <p className="card-text">Amenities: {property.amenities.join(', ')}</p>
                    <p className="card-text">Proximity to Hospitals: {property.proximityToHospitals ? 'Yes' : 'No'}</p>
                    <p className="card-text">Proximity to Colleges: {property.proximityToColleges ? 'Yes' : 'No'}</p>
                    <p className="card-text">Available: {property.available ? 'Yes' : 'No'}</p>
                  </div>
                  <Link to={`/property/${property._id}`} className="btn btn-primary">I am interested</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No properties found</p>
          )}
        </div>
      </div>
    </div>
  );
}