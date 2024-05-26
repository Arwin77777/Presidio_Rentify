import  { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token in local storage
        console.log('Login successful');

        // Decode the token to find out the user type
        const decodedToken = jwtDecode(data.token);
        console.log(decodedToken.userType);
        if (decodedToken.userType === 'seller') {
          navigate('/seller-properties'); // Navigate to seller properties if user is a seller
        } else {
          navigate('/home'); // Navigate to home for other user types
        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Welcome Back!
          </h1>
          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Sign in to continue.
          </p>
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email' name='email' type='email' onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={handleChange}/>
                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Log In</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;