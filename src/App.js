import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login'
import Register from './components/register/Register'
import AboutUs from './components/aboutus/AboutUs'
import UserProfile from './components/user-profile/UserProfile'
import Cart from './components/cart/Cart'
import Products from './components/products/Products'
import RootLayout from './components/RootLayout'
import ErrorPage from './components/ErrorPage';

function App() {
    const routerObj=createBrowserRouter([
      //Routing details
      {
        path:'/',   //path is empty
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
          //empty
          {
            path:'/',
            element:<Home/>
          },
          //login
          {
            path:'/login',
            element:<Login/>,
            
          },
          //register
          {
            path:'/register',
            element:<Register/>
          },
          //aboutus
          {
            path:'/aboutus',
            element:<AboutUs/>
          },
          //user-profile
          {
            path:'/user-profile',
            element:<UserProfile/>,
            children:[
              {
                //products
                path:'products',
                element:<Products/>
              },
              {
                //cart
                path:'cart',
                element:<Cart/>
              }
            ]
          }

        ]
      }

    ])

  return (
    <div>
        <RouterProvider router={routerObj}/>
    </div>
  );
}

export default App;
