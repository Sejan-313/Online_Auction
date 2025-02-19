import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './frontend/main/user/components/Home.jsx';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './frontend/main/user/components/Login.jsx';
import Signup_Seller from './frontend/main/user/components/signup_seller.jsx';
import Signup_User from './frontend/main/user/components/signup_user.jsx';
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux"
import store from './frontend/main/store/index.js';


const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children:[
    {path:'/',element:<Home/>},
    {path:'/login',element:<Login/>},
    // {path:'/signup_seller',element:<Signup_Seller/>},
    // {path:'/signup_user',element:<Signup_User/>}
  ],  
  },
  {
  path:'signup_seller',
  element:<Signup_Seller/>
  },
  {
    path:'signup_user',
    element:<Signup_User/>
  },
]);


        

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)


