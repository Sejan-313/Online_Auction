import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoBan } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import {FaTachometerAlt, FaClipboardList, FaPlus, FaList, FaEdit, FaTrash, FaGavel, FaShoppingCart, FaMoneyBill, FaChartBar, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { FaTrophy, FaCreditCard, FaShippingFast, FaInfoCircle, FaBell } from "react-icons/fa";

const Sidebar = () => {

    const navigate=useNavigate();
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        localStorage.removeItem("role");
        localStorage.removeItem("seller_id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="d-flex flex-column border-end p-3 h-100">
            <h4 className="text-primary mb-4">Seller<span className="text-secondary">Panel</span></h4>
            
            <Nav className="flex-column p-3 vh-100">
                <h6 className="text-dark">Main</h6>
                <Link to="dashboard" className="text-secondary nav-link d-flex align-items-center">
                    <FaTachometerAlt className="me-2" /> Dashboard
                </Link>
                <Link to="auction-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaClipboardList className="me-2" /> Auction Status
                </Link>

                <h6 className="text-dark mt-3">Auctions</h6>
                <Link to="add-auction" className="text-secondary nav-link d-flex align-items-center">
                    <FaPlus className="me-2" /> Add Auction
                </Link>
                <Link to="manage-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Manage Auctions
                </Link>
                <Link to="reject-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <IoBan className="me-2" /> Rejected Auctions
                </Link>
                
                <h6 className="text-dark mt-3">Orders</h6>
                <Link to="winning-bids" className="text-secondary nav-link d-flex align-items-center">
                    <FaTrophy className="me-2" /> Winning Bids
                </Link>
                <Link to="order-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaShippingFast className="me-2" /> Order Tracking
                </Link>
                <Link to="order-details" className="text-secondary nav-link d-flex align-items-center">
                    <FaInfoCircle className="me-2" /> Order Details
                </Link>
                <Link to="notifications" className="text-secondary nav-link d-flex align-items-center">
                    <FaBell className="me-2" /> Notifications
                </Link>

                <h6 className="text-dark mt-3">Payments</h6>
                <Link to="payment-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaCreditCard className="me-2" /> Payment Status
                </Link>

                <h6 className="text-dark mt-3">Settings</h6>
                <Link to="profile" className="text-secondary nav-link d-flex align-items-center">
                    <IoPersonSharp className="me-2" /> Profile
                </Link>
                <Link to="update-profile" className="text-secondary nav-link d-flex align-items-center">
                    <FaUserCog size={18} className="me-2" /> Update Profile
                </Link>
            </Nav>

            <div className="mt-auto p-3 border-top d-flex align-items-center">
                <Link onClick={logout} className="text-secondary nav-link d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
