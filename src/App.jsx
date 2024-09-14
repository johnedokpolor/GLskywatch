import {useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import  Weather  from './Weather';
import {SignIn as Login} from './SignIn';
import {SignUp as Register} from './SignUp';
import { auth} from "./firebase"
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './style.css';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged( async user => {
        // setIsLoggedIn(user)
    })
})


  return (
    <Router>
        <div className='app'>  
          <Routes>
            <Route path='/' element ={isLoggedIn? <Navigate to = "./weather"/>:<Login />}/>
            <Route path='/login' element ={<Login />}/>
            <Route path='/register' element ={<Register />}/>
            <Route path='/weather' element ={<Weather />}/>
          </Routes>
          <p className='dev'>Made with 💓 by GLtech</p>
   </div>
    </Router>
    
  )
}

export default App
