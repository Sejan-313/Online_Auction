import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [data, setdata] = useState({
    token: localStorage.getItem("token"),
    name: localStorage.getItem("fullName"),
    role: localStorage.getItem("role"),
  });

  const navigate = useNavigate(); 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");

    setdata({
      token: null,
      name: null,
      role: null,
    });

    navigate("/");
  };

  return (
    <>
      <header className="header-section">
        <div className="container-fluid">
          <div className="inner-header">
            <div className="logo">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
            <div className="header-right">
              <img src="img/icons/search.png" alt="" className="search-trigger" />
              {data.token && localStorage.getItem("role") === "user" && (
                <>
                  <img src="img/icons/man.png" alt="" />
                </>
              )}
              <a href="#">
                <img src="img/icons/bag.png" alt="" />
                <span>2</span>
              </a>
            </div>
            <div className="user-access d-flex justify-content-center align-items-center gap-2 ">
              {data.role !== "user" ? (
                <>
                  <Link to="/signup_user">Sign up</Link> / <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <h3 className="user-font">Welcome {data.name}</h3>
                  <input
                    type="submit"
                    value="Log Out"
                    className="btn logout-btn"
                    onClick={logout}
                  />
                </>
              )}
            </div>
            <nav className="main-menu mobile-menu">
              <ul>
                <li>
                  <Link className="active" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="./categories.html">Shop</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="product-page.html">Product Page</a>
                    </li>
                    <li>
                      <a href="shopping-cart.html">Shopping Card</a>
                    </li>
                    <li>
                      <a href="check-out.html">Check out</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <a href="./check-out.html">Blog</a>
                </li>
                <li>
                  <Link to="/ContactUs">Contact</Link>
                </li>
              </ul>
            </nav>
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
