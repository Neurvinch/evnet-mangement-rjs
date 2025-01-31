const Event = require("../models/Event")


const createEvent = async (req ,res) =>{
     try {
        const event = await Event.create({
            ...req.body,
            organizer : req.user._id
        });
        res.status(200).json(event);
        
     } catch (error) {
        res.status(400).json({ message: error.message });
        
     }
}

const getAllEvents = async( req,res) =>{

    try {
        const events = await Event.find().populate('organizer' , 'title');
        res.status(200).json(events);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}



const bookEvent = async (req,res) =>{

    try {
    const event = await Event.findById(req.params.id);

    if(!event){
        return res.status(404).json({ message: "Event not found" });
    }

    if(event.attendee.includes(req.user._id)){
        return res.status(400).json({ message: "You have already booked this event" });
    }

     event.attendee.push(req.user._id);
     await event.save();
     res.status(200).json( {message : "Event Booked" , event });
} catch (error) {
    res.status(400).json({ message: error.message });
}
}

module.exports = {createEvent , getAllEvents , bookEvent}