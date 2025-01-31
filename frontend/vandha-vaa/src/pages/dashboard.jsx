import {useAuth} from "../context/Authcontext";
import {useEvents} from "../context/EventContext"


const dashboard = () => {
    const {user} = useAuth();
    const {events} = useEvents();


    const userevents =  events.filter(  ( event) =>( 
           event.organizer._id === user?.id ||
           event.attendees.includes(user?.id)
    ))
  return (
    <div>
        <h2> Vandha vaa Da , {user?.name}</h2>
        <h3> your events</h3>
        {events.map( (event) =>( 
            <div key={event.id}
            >
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <p> status : { event.organizer._id === user?._id ? 'organizing' : 'attending'}</p>
            </div>
        ))}
    </div>
  )
}

export default dashboard