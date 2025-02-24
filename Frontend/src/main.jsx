import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from './role/user/components/Home.jsx';
import store from './role/store/index.js';
import Login from './role/user/components/login.jsx';
import Signup_Seller from './role/user/components/signup_seller.jsx';
import Signup_User from './role/user/components/signup_user.jsx';
import "bootstrap/dist/css/bootstrap.min.css"
import ContactUs from './role/user/pages/contactUs.jsx';

const router=createBrowserRouter([
  { 
    path:'/', element:<App/>, children:[
      {path:'/',element:<Home/>},
      {path:'/ContactUs',element:<ContactUs/>},
    ],  
  },
  { path:'signup_seller', element:<Signup_Seller/> },
  { path:'signup_user', element:<Signup_User/> },
  { path:'login', element:<Login/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)


