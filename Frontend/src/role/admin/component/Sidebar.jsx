import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaList, FaClock, FaCheckCircle, FaUser, FaStore, FaComments, FaSignOutAlt, FaGavel, FaChartPie, FaTruck } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        localStorage.removeItem("role");
        localStorage.removeItem("admin_id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="d-flex flex-column border-end p-3 h-100">
            <h4 className="text-primary mb-4">Admin <span className="text-secondary">Panel</span></h4>
            
            <Nav className="flex-column align-items-start justify-content-evenly p-3 vh-100">
                <h6 className="text-dark">Main</h6>
                <Link to="dashboard" className="text-secondary nav-link d-flex align-items-center">
                    <FaChartPie className="me-2" /> Dashboard
                </Link>
                <Link to="auction-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaGavel className="me-2" /> Auction Status
                </Link>

                <h6 className="text-dark mt-3">Auction</h6>
                <Link to="auction-manage" className="text-secondary nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Manage 
                </Link>
                <Link to="pending-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <FaClock className="me-2" /> Pending
                </Link>
                <Link to="complete-auctions" className="text-secondary nav-link d-flex align-items-center">
                    <FaCheckCircle className="me-2" /> Completed 
                </Link>

                <h6 className="text-dark mt-3">Delivery</h6>
                <Link to="manage-delivery" className="text-secondary nav-link d-flex align-items-center">
                    <FaTruck className="me-2" /> Manage Delivery
                </Link>
                <Link to="change-order-status" className="text-secondary nav-link d-flex align-items-center">
                    <FaList className="me-2" /> Change Order Status
                </Link>

                <h6 className="text-dark mt-3">Reports</h6>
                <Link to="view-reports" className="text-secondary nav-link d-flex align-items-center">
                    <FaChartPie className="me-2" /> View Order Reports
                </Link>

                <h6 className="text-dark mt-3">Account</h6>
                <Link to="user-account" className="text-secondary nav-link d-flex align-items-center">
                    <FaUser className="me-2" /> User
                </Link>
                <Link to="seller-account" className="text-secondary nav-link d-flex align-items-center">
                    <FaStore className="me-2" /> Seller
                </Link>
                <Link to="feedback" className="text-secondary nav-link d-flex align-items-center">
                    <FaComments className="me-2" /> Feedback
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
