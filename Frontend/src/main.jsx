import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from './role/user/page/Home.jsx';
import store from './role/store/index.js';
import Login from './role/user/page/login.jsx';
import Signup_Seller from './role/user/page/signup_seller.jsx';
import Signup_User from './role/user/page/signup_user.jsx';
import Seller from './role/seller/seller.jsx';
import "bootstrap/dist/css/bootstrap.min.css"

const router=createBrowserRouter([
  { 
    path:'/', element:<App/>, children:[
      {path:'/',element:<Home/>},
    ],  
  },
  { path:'signup_seller', element:<Signup_Seller/> },
  { path:'signup_user', element:<Signup_User/> },
  { path:'login', element:<Login/> },
  { path:'seller', element:<Seller/> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)


