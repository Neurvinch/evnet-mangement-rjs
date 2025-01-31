import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import { AuthProvider} from "./context/Authcontext"

import './App.css'
import Register from './pages/Register';

function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path ='/register' element = {<Register/>} />
          
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
