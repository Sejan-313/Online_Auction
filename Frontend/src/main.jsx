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
import Contact from './role/user/page/contact.jsx';

import Add_Auction from './role/seller/page/Add_Auction.jsx';
import Dashboard from './role/seller/page/Dashboard.jsx';
import Manage_Auctions from './role/seller/page/Manage_Auctions.jsx';
import Order_Management from './role/seller/page/Order_Management.jsx';
import Payments_Earnings from './role/seller/page/Payments_&_Earnings.jsx';
import Reports_Analytics from './role/seller/page/Reports_&_Analytics.jsx';
import Settings from './role/seller/page/Settings.jsx';

import "bootstrap/dist/css/bootstrap.min.css"
import UserProfile from './role/user/component/UserProfile.jsx';


const router = createBrowserRouter([
  { 
    path: "/", element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "seller", element: <Seller />,
    children: [
      { path: "add-auction", element: <Add_Auction /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "manage-auctions", element: <Manage_Auctions /> },
      { path: "order-management", element: <Order_Management /> },
      { path: "payments-&-earnings", element: <Payments_Earnings /> },
      { path: "reports-&-analytics", element: <Reports_Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "signup_seller", element: <Signup_Seller /> },
  { path: "signup_user", element: <Signup_User /> },
  { path: "login", element: <Login /> },
  {path:'userprofile',element:<UserProfile/>},

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)


