import { useState } from "react"
import { createUserWithEmailAndPassword} from "firebase/auth"
import { auth, db } from "./firebase"
import { setDoc, doc } from "firebase/firestore"
import Swal from "sweetalert2"
import {Link, useNavigate} from "react-router-dom"


function SignUp() {
  
    const [user, setUser] = useState({
        email:"",
        password:"",
        name: ""
    })
    const navigate = useNavigate()
 
    function handleRegChange(event) {
        setUser(prev => {
            const {name, value} = event.target
            return {
                ...prev,
                [name] : value
            }
        })
    }
    async function handleRegister  (e) {
        Swal.fire({
            text: "Registering User...",
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            width: 200,
            timerProgressBar: true,
           })
        const {email, password, name} = user
        e.preventDefault()
        try {
           await createUserWithEmailAndPassword(auth, email, password)
           .then( async data => {
               setDoc(doc(db,"Users", data.user.uid), {
               email: email,
               name: name,
               password:password,
            })
           })
           Swal.fire({
            text: "User Registered Successfully",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            icon: "success"
           }).then(() => {
            navigate('/login')
           })
        } catch (error) {
            console.log(error.message)
            // Swal.fire({
            //     title: "An Error Occured",
            //     text: "Try Again",
            //     showConfirmButton: false,
            //     timer: 2000,
            //     timerProgressBar: true,
            //     icon: "error"
            //    })
        }
    }
 
    
    return(
        <div className="auth-form">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                 <input type="text" name="name" onChange={handleRegChange} placeholder="Name" required/>
                 <input type="text" name="email"  onChange={handleRegChange} placeholder="Email" required/>
                 <input type="password" name="password" onChange={handleRegChange} placeholder="Password" required/>
                 <div className="buttons">
                    <Link to = "/login"><button className="not">Login</button></Link>
                   <button>Register</button>
                 </div>
            </form>
        </div>
    )
}
export  {SignUp}
