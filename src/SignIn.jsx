import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {auth, provider, db} from "./firebase"
import Swal from "sweetalert2"
import { setDoc, doc } from "firebase/firestore"
import {Link, useNavigate} from "react-router-dom"
import google from './assets/google.png'


function SignIn() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    function handleLogChange(event) {
        setUser(prev => {
            const {name, value} = event.target
            return {
                ...prev,
                [name] : value
            }
        })
    };

    async function handleGoogleLogin() {
        try {
            await signInWithPopup(auth, provider)
            .then( async data => {
                try {
                    setDoc(doc(db,"Users", data.user.uid), {
                    email: data.user.email,
                    name: data.user.displayName,
                    })
                } catch (error) {
                    console.log(error)
                }
                
                Swal.fire({
                    text: "Logging In...",
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 3000,
                    width: 200,
                    timerProgressBar: true,
                   }).then(() => {
                    Swal.fire({
                        title: `Welcome ${data.user.displayName}`,
                        text: "Stay Dry, Stay Sunny, Stay Informed",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        icon: "success"
                       })
                   }).then(() => {
                    navigate('/weather')
                   })
                
            })
        } catch (error) {
            
        }
    }
 
    async function handleLogin(e) {
        e.preventDefault();
        Swal.fire({
            text: "Logging In...",
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            width: 200,
            timerProgressBar: true,
           })
        const {email, password} = user

        try {
            await signInWithEmailAndPassword(auth, email, password)
            Swal.fire({
                title: "Welcome to GLskywatch🌤️",
                text: "Stay Dry, Stay Sunny, Stay Informed",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                icon: "success"
               })
            navigate('/weather')
        
        } catch (error) {
            Swal.fire({
                title: "An Error Occured",
                text: "Try Again",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                icon: "error"
               })
        }
    }
    return(
        <div className="auth-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="email"  onChange={handleLogChange} placeholder="Email" required/>
                <input type="password" name="password" onChange={handleLogChange} placeholder="Password" required/>
                <div className="buttons">
                    <button>Login</button>
                    <Link to = "/register"><button className="not">Register</button></Link>
                 </div>
            </form>
                 <img src={google} onClick={handleGoogleLogin} alt="google-sign-in" className="google-sign-in"/>
        </div>
    )
}
export {SignIn}