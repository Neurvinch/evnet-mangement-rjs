import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import { AuthProvider} from "./context/Authcontext"
import {EventProvider} from "./context/EventContext"

import './App.css'
import Register from './pages/Register';

function App() {


  return (
    <Router>
      <AuthProvider>
        <EventProvider>
        <Routes>
          <Route path ='/register' element = {<Register/>} />

        </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
