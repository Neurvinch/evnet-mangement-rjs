import React, { useState } from 'react'
import  { useEvents} from "../context/EventContext"

const EventForm = () => {
  const [formData , setFormData] = useState({
    title : "",
    description : "",
    date : "",
    location : "",
    price : 0,
    capacity : 0
  })

  const { createEvent} = useEvents();

  const handleSubmit = async (e) =>{
    e.preventDefault();
  await createEvent(formData);
  }
  return (
    <form>
      <input
        type="text"
        placeholder="Title"
        value ={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      
      />

      <textarea
       placeholder="Description"
       value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />

      <input
        type="datetime-local"
        placeholder="Date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      /> 
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <input
       type="number"
       placeholder="Price"
       value={formData.price}
       onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      
      />
      <input
       type="number"
       placeholder="Capacity"
       value={formData.capacity}
       onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
      
      />
      <button type="submit" onClick={handleSubmit}>Create Event</button>
    </form>
  )
}

export default EventForm