const Footer = () =>
{
    return <>
     <footer className="footer-section spad footer">
        <div className="container">
            <div className="newslatter-form">
                <div className="row">
                    <div className="col-lg-12">
                        <form action="#">
                            <input type="text" placeholder="Your email address"/>
                            <button type="submit">Subscribe to our newsletter</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-widget">
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>About us</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Community</li>
                                <li>Jobs</li>
                                <li>Shipping</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Customer Care</h4>
                            <ul>
                                <li>Search</li>
                                <li>Privacy Policy</li>
                                <li>2019 Lookbook</li>
                                <li>Shipping & Delivery</li>
                                <li>Gallery</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Our Services</h4>
                            <ul>
                                <li>Free Shipping</li>
                                <li>Free Returnes</li>
                                <li>Our Franchising</li>
                                <li>Terms and conditions</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Information</h4>
                            <ul>
                                <li>Payment methods</li>
                                <li>Times and shipping costs</li>
                                <li>Product Returns</li>
                                <li>Shipping methods</li>
                                <li>Conformity of the products</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-links-warp">
			<div className="container">
				<div className="social-links">
					<a href="" className="instagram"><i className="fa fa-instagram"></i><span>instagram</span></a>
					<a href="" className="pinterest"><i className="fa fa-pinterest"></i><span>pinterest</span></a>
					<a href="" className="facebook"><i className="fa fa-facebook"></i><span>facebook</span></a>
					<a href="" className="twitter"><i className="fa fa-twitter"></i><span>twitter</span></a>
					<a href="" className="youtube"><i className="fa fa-youtube"></i><span>youtube</span></a>
					<a href="" className="tumblr"><i className="fa fa-tumblr-square"></i><span>tumblr</span></a>
				</div>
			</div>

<div className="container text-center pt-5">
                <p>
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </p>
            </div>


		</div>
    </footer>

    </>

}

export default Footer;