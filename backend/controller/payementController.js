import Razorpay from "razorpay";
import Event from "../models/Event"

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req ,res) =>{
    try {
        const event = await Event.findById(req.body.eventId);

        const amount =  event.price * 100;

        const options = {
            amount : amount,
            currency : "INR",
            receipt : `receipt_${Date.now() }`,
            payement_capture : 1
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
        
    } catch (error) {
         console.error(error);
    }
}

export const verifyPayement = async (req, res) =>{
     try { 
        
        
        const {razorpay_payement_id , razorpay_order_id , razorpay_signature} = req.body;

        const genertaed_signature  = crypto
        .createHmac('sha256' , process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id} | ${razorpay_payement_id}`)
        .digest('hex');

        if(genertaed_signature !== razorpay_signature) {
            return res.status(400).json({error : "Invalid Signature" });
        }

         res.json({message : "Payment verified successfully", payementId : razorpay_payement_id});



     } catch (error) {
        
        console.error(error);
     }
}