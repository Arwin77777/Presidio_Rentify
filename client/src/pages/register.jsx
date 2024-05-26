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
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userType: 'buyer'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked ? 'seller' : 'buyer' : value
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>
          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='First name' name='firstName' type='text' onChange={handleChange}/>
                  </MDBCol>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Last name' name='lastName' type='text' onChange={handleChange}/>
                  </MDBCol>
                </MDBRow>
                <MDBInput wrapperClass='mb-4' label='Email' name='email' type='email' onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Phone number' name='phoneNumber' type='number' onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={handleChange}/>
                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox name='userType' id='flexCheckDefault' label='Seller?' onChange={handleChange} />
                </div>
                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Sign Up</MDBBtn>
                <Link to="/login">
                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Already have an account</MDBBtn>
                </Link>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;