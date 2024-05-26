import './App.css';
import { Home } from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PropertyDetails from './pages/propertDetails'; // Corrected typo here if it's a typo in your file system
import SellerProperties from './pages/sellerProperties';
import Redirector from './components/redirector';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UpdateProperty from './pages/updateProperties'; // Corrected the import path

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/home",
            element: <><Redirector /><Home /></>,
        },
        {
            path: "/property/:id",
            element: <PropertyDetails />,
        },
        {
            path: "/seller-properties",
            element: <SellerProperties />,
        },
        {
          path: "/update-property/:id",
          element: <UpdateProperty />
        },
        {
          path: "/add-property",
          element: <UpdateProperty /> // Use UpdateProperty for adding a property
        }
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;