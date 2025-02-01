import React, { useEffect } from 'react'
import { useEvent} from "../context/EventContext"
import RazorpayPayment from './RazorpayPayment';
const eventList = () => {
    const { events , loading , fetchEvenmts , bookEvent} = useEvent();

     useEffect( () =>{
        fetchEvenmts();
     },[])
     if (loading) {
        return <div>Loading...</div>;
     }
  return (
    <div>
        <div>
            {events.map( ( event)=>(
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Date : {new Date(event.date).toLocaleDateString()}</p>
                    <p> Location : {event.location}</p>
                    <p>Price : {event.price}</p>
                    <button onClick={() => bookEvent(event.id)}>
                        Book Now ({event.attendees?.length || 0} / {event.capacity})
                    </button>
                    {event.price > 0 ? (
                        <RazorpayPayment event={event} />
                    ) : (
                        <button onClick={ () => bookEvent(event.id)}
                        >Free Event</button>
                    )}

                </div>
            ))}

        </div>
    </div>
  )
}

export default eventList