const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
     title : {type : String , required : true },
     description : {type : String , required : true },
     date: { type: Date, required: true },
     location: { type: String, required: true },
     price : Number,
     capacity : Number,
     organizer : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     attendee : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Event', eventSchema);