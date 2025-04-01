import axios from "axios";
import { useState } from "react";
import toast ,{ Toaster } from 'react-hot-toast'

const Payement = () =>
{

  const [amount,setAmount]=useState(350);

  const handlePayement = async () =>
  {

    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/order`,{amount});
      console.log(res);
      console.log(res.data);
      
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
      
      handklePayementVerify(res.data)

    }
    catch(error)
    {
      console.error("Error Payement to  user:", error);
    }
  }


 
  const handklePayementVerify = async (data) =>
  {
    const options = {
      key: "rzp_test_b4iBWY0X70QR2V",
      amount:data.amount,
      currency:data.currency,
      name:"Sejan",
      description:"Test Mode",
      oeder_id:data.id,
      handler : async (res) => {
        console.log("Response",res);

        const obj= {
          razorpay_order_id:res.razorpay_order_id,
          razorpay_payement_id:res.razorpay_payement_id,
          razorpay_signature:res.razorpay_signature
        }

        try
        {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify`,{obj})
          
          if(res)
          {
            toast.success(res.message);
          }

        }
        catch(error)
        {
          console.log("Error",error);
          
        }
        
      },
      theme:{
       color:"5f63b8"
     }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  return (
    <>
      <input type="submit" onClick={handlePayement} value="Pay"></input>
      <Toaster/>
    </>
  )
}

export default Payement;