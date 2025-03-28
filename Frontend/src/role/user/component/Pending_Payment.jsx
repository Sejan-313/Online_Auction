import css from "./Pending_Payment.module.css";
import { Link } from "react-router-dom";

const Pending_Payment = () => {
    const user_id = localStorage.getItem("user_id");

    return (
        <div className={css['pending_payment']}>
            <div className={`${css['card']} border-top p-2 mb-3`}>
                <div style={{height: "100%", width: "150px"}}>
                    <img style={{objectFit: "contain", height: "100%", width: "100%"}} src="../../../../public/img/products/img-1.jpg" alt="" />
                </div>
                <div style={{height: "100%", width: "100%", overflow: "auto"}}>
                    <span>vinit</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptate assumenda quidem dolorem eos velit in officia quas soluta doloremque. Iusto corporis !</p>
                </div>
                <div style={{height: "100%", width: "150px"}} className="d-flex justify-content-center align-items-center border-start">
                    <Link to={`/user-account/user-payment/67d7a06eadf36c704ff3b286`}>Pay</Link>
                </div>
            </div>
        </div>
    )
}

export default Pending_Payment;
