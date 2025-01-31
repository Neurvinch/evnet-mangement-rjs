import { createContext , useEffect , useState , useContext, Children} from 'react';
import axios from 'axios';

const AuthContext = createContext();



const Authcontext = () => {

    const [user , setUser] = useState(null);
    const [loading ,setLoading] = useState(true) ;

    useEffect( () =>{
          const checkAuth = async() =>{
        const token = localStorage.getItem('item');
        if(token){
            try {
                const res = await axios.get('/api/auth/me',{
                    headers : { Authorization : `Bearer ${token}` }
                })
                setUser(res.data);
                
            } catch (error) {
                 logout();
            }
        }
        setLoading(false);
    }
    checkAuth();
    },[])

  const register = async ( name , email , password) =>{

    const res = await axios.post('/api/auth/register' ,{
        name , email , password})

        localStorage.setItem('token' ,res.data.token)
        setUser(res.data.user);

  }


  const login = async (email , password) =>{

    const res = await axios('/api/auth/login' ,{email, password});

    localStorage.setItem('token' ,res.data.token)
    setUser(res.data.user);
  };


  const logout =() =>{
    localStorage.removeItem('token');
    setUser(null);
  }



  return (
     <AuthContext.provider value={{user , register , login , logout , loading}}>
        {Children}
     </AuthContext.provider>
  )
}

export default useAuth = () => useContext(AuthContext);