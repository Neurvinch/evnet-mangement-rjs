import axios from "axios";
import { createContext } from "react"



 const EventContext = createContext();

const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [loading , setLoading] = useState(false);
    const fetchEvenmts = async() =>{
        try {
            setLoading(true);
            const res = await axios.get("/api/events" );
            setEvents(res.data);            
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false);
        }
    }


    const createEvent = async ( eventData) =>{
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('/api/events' , eventData ,{
                haeders:{
                    Authorization: `Bearer ${token}`
                }
            })
             setEvents([...events , res.data]);
             return res.data;
            
        } catch (error) {
            console.log(error);
            
        }
    } 


    const bookEvent = async (eventId)  =>{
        try {
            
        } catch (error) {
            
        }
    }





  return (
    <div>EventProvider</div>
  )
}

export default EventProvider