import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = () => {
  const navigate = useNavigate(); 

  const [data, setdata] = useState({
    token: localStorage.getItem("token"),
    fullName: localStorage.getItem("fullName"),
    user_id: localStorage.getItem("user_id"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setdata({ token: null, fullName: null, user_id: null, email: null, role: null });
    navigate("/");
  };

  return (
    <>
      <header className="header-section d-flex justify-content-center align-items-center">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            
            <div className="">
                <a href="./index.html">
                  <img src="img/logo.png" alt=""/>
                </a>
            </div>

            <nav className="navbar navbar-expand-lg">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav gap-3">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="./categories.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                      Shop
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="product-page.html">Product Page</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="./check-out.html">Blog</a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="d-flex align-items-center gap-4">
              <IoIosSearch className="text-muted" size={27} />
              {data.token && data.role === "user" && (
                <>
                  <Link to="/user-basket" className="text-dark"> <HiOutlineShoppingBag className="text-muted" size={25} /> </Link>
                  <Link to="/user-account" className="text-dark"> <GoPerson className="text-muted" size={25} /> </Link>
                </>
              )}
            </div>

            <div className="user-access d-flex align-items-center">
              {data.role !== "user" ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/signup_user" className="text-muted">Sign up</Link>
                  <span className="text-muted">/</span>
                  <Link to="/login" className="text-muted">Login</Link>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted">Welcome {data.fullName}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="header-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="header-item">
                <img src="img/icons/delivery.png" alt="" />
                <p>Free shipping on orders over $30 in USA</p>
              </div>
            </div>
            <div className="col-md-4 text-left text-lg-center">
              <div className="header-item">
                <img src="img/icons/voucher.png" alt="" />
                <p>20% Student Discount</p>
              </div>
            </div>
            <div className="col-md-4 text-left text-xl-right">
              <div className="header-item">
                <img src="img/icons/sales.png" alt="" />
                <p>30% off on dresses. Use code: 30OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
