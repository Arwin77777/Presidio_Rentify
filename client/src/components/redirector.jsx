import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Redirector = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            if (user.userType === 'seller') {
                navigate('/seller-properties');
            }
        }
    }, [navigate]);

    return null; // This component does not render anything
};

export default Redirector;