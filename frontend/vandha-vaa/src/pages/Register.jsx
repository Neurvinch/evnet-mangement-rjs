import{ useState} from 'react'

import {useAuth } from '../context/Authcontext';
import { register } from '../../../../backend/controller/AuthController';

const Register = () => {
const [formData , setFormData] = useState({ name: "" , email: "" , password: ""  });
  const { Register} = useAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await register( formData.user , formData.email , formData.password);
  }
  return (
     <form onSubmit={handleSubmit}>
        <input
         type = "text"
         placeholder = "Name"
         onChange = {(e) => setFormData({...formData , name : e.target.value})}
        
        />

        <input
         type = "email"
         placeholder = "Email"
         onChange = {(e) => setFormData({...formData , email : e.target.value})}
         />

        <input
        type = "password"
        placeholder = "Password"
        onChange = {(e) => setFormData({...formData , password : e.target.value})}
        />
        <button type = "submit">Register</button>
     </form>
  )
}

export default Register