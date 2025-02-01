import React from 'react'
import {useAuth } from "../context/Authcontext";
import {useEvents} from "../context/EventContext"
import axios from 'axios';

const RazorpayPayment = () => {
    const {user} = useAuth();
    const {bookEvent} = useEvents();

const loadScript = ( {src}) =>{
     return new Promise( ( resolve) =>{
        const script = document.createElement('script');
        script.src = src;
        script.onload = () =>{resolve(true)};
        script.onerror = () =>{resolve(false)};
        document.body.appendChild(script);
     })

}


const displayRazorPay =  async () =>{

    const res = await loadScript({src : "https://checkout.razorpay.com/v1/checkout.js"});
    if(!res){
        alert('Razorpay SDK failed to load');
        return;
    }

    try {
        const {data : order} = await axios.post('/api/payement/create-order' , {
            eventId : event._id
        });

        const options = {
            key : process.env.RAZORPAY_KEY_ID,
            amount : order.amount,
            currency : order.currency,
            name : 'event.title',
            description : 'event.description',
            order_id : order.id,
             handler : async function (response) {
                 const {data} = await axios.post('/api/payement/verify' , {
                    razorpay_payment_id : response.razorpay_payment_id,
                    razorpay_order_id : response.razorpay_order_id,
                    razorpay_signature : response.razorpay_signature,
                     eventId : event._id
                 });

                 if(data.success) {
                    await bookEvent(event._id , data.payementId) ;
                     
                 }
             },
             prefill : {
                name : user.name,
                email : user.email,
             },
             theme: {
                color: "#3399cc",}
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        
    } catch (error) {
         console.error(error);
    }

}



  return (
    <button onClick={displayRazorPay}>
        pay Rs.{event.price}
    </button>
  )
}

export default RazorpayPayment