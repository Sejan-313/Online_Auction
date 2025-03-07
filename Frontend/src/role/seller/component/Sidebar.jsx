import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {FaTachometerAlt, FaPlus, FaList, FaEdit, FaTrash, FaGavel, FaShoppingCart, FaMoneyBill, FaChartBar, FaUserCog, FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {

    const navigate=useNavigate();
    const logout = () =>
    {

        localStorage.removeItem("email");
        navigate("/");
    }

    const email = localStorage.getItem("email");
    const fullname = localStorage.getItem("fullName");

    return (
        <div className="d-flex flex-column p-3 bg-light h-100">
            <h4 className="text-primary mb-4">Seller<span className="text-secondary">Panel</span></h4>
            
            <Nav className="flex-column p-3 bg-light vh-100">
                <h6 className="text-dark">Main</h6>
                <Link to="dashboard" className="text-secondary nav-link d-flex align-items-center">
                    <FaTachometerAlt className="me-2" /> Dashboard
                </Link>

                <h6 className="text-dark mt-3">Auctions</h6>
                <Link to="add-auction" className="text-secondary nav-link d-flex align-items-center">
                    <FaPlus className="me-2" /> Add Auction
                </Link>
                <Link to="manage-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Manage Auctions
                </Link>

                <h6 className="text-dark mt-3">Orders</h6>
                <Link to="order-management" className="text-secondary nav-link d-flex align-items-center">
                    <FaShoppingCart className="me-2" /> Order Management
                </Link>

                <h6 className="text-dark mt-3">Payments</h6>
                <Link to="payments-&-earnings" className="text-secondary nav-link d-flex align-items-center">
                    <FaMoneyBill className="me-2" /> Payments & Earnings
                </Link>

                <h6 className="text-dark mt-3">Reports</h6>
                <Link to="reports-&-analytics" className="text-secondary nav-link d-flex align-items-center">
                    <FaChartBar className="me-2" /> Reports & Analytics
                </Link>

                <h6 className="text-dark mt-3">Profile</h6>
                <Link to="settings" className="text-secondary nav-link d-flex align-items-center">
                    <FaUserCog className="me-2" /> Settings
                </Link>
                <Link onClick={logout} className="text-secondary nav-link d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                </Link>
            </Nav>

            <div className="mt-auto d-flex align-items-center">
                <img src="/img/products/img-3.jpg" className="rounded-circle me-2" alt="User" style={{ width: "40px", height: "40px" }} />
                <div>
                    <strong>{email}</strong>
                    <p className="text-muted mb-0">{fullname}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
