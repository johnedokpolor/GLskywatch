import {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import humidityIcon from './assets/humidity.png';
import rainIcon from './assets/rain.png';
import snowIcon from './assets/snow.png';
import windIcon from './assets/wind.png';
import Swal from 'sweetalert2';
import { auth, db } from "./firebase"
import { getDoc, doc } from "firebase/firestore"
import {Link, useNavigate} from "react-router-dom"


 const Weather = () => {
    const [weatheData, setWeatherData] = useState('')
    const inputRef = useRef(null)
    const navigate = useNavigate()

    async function fetchUserData() {
        auth.onAuthStateChanged( async user => {
          try {
                const docRef = doc(db, "Users", user.uid)
                const docSnap = await getDoc(docRef)
                
          } catch (error) {
                // navigate('/login')
            
          }    
        })
    }

    useEffect(() => {
       fetchUserData()
    },[]);




    const allIcons = {
        "01d" : clearIcon,
        "01n" : clearIcon,
        "02d" : cloudIcon,
        "02n" : cloudIcon,
        "03d" : cloudIcon,
        "03n" : cloudIcon,
        "04d" : drizzleIcon,
        "04n" : drizzleIcon,
        "09d" : rainIcon,
        "09n" : rainIcon,
        "10d" : rainIcon,
        "10n" : rainIcon,
        "13d" : snowIcon,
        "13n" : snowIcon,
    }
    const search = (city) => {
        if(city === "") {
            Swal.fire({
                    title: 'No City Name Found☹️',
                    text: 'Please Enter a City Name🌎.',
                    timer: 2000,
                    icon: "error",
                    showConfirmButton: false
                  })
                  return;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
        .then(res => res.json())
        .then(data => {
            const icon = allIcons[data.weather[0].icon] || clearIcon
            Swal.fire({
                text: 'Running Forecasts',
                timer: 2000,
                position: 'top-right',
                width: 200,
                timerProgressBar:true,
                showConfirmButton: false
              }).then(() => {
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon
                })
              })
            })
        .catch(err => {
            Swal.fire({
                title: 'Oops...😓',
                text: 'City Not Found💔',
                timer: 2000,
                icon: "error",
                showConfirmButton: false
            })
        })
    }
useEffect(() => {
    fetchUserData()
    const randomIndex = Math.floor(Math.random() * 6)
    const cities = ['New York', 'London', 'Edo', 'Lagos', 'Ilorin']
    const city = cities[randomIndex]
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
        .then(res => res.json())
        .then(data => {
            const icon = allIcons[data.weather[0].icon] || clearIcon
            setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })})
        .catch(err => {
        })
},[])


    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search City...' onKeyDown={e => {
                if (e.key === "Enter") {
                    search(inputRef.current.value)
                }}}  />
               <div onClick={() => search(inputRef.current.value)}><FontAwesomeIcon icon={faSearch} /></div> 
            </div>
            {weatheData? <>
            <img src={weatheData.icon} alt="weather-icon" className="weather-icon" />
            <p className="temp">{weatheData.temperature}℃</p>
            <p className="location">{weatheData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidityIcon} alt="humidity-icon" />
                    <div>
                        <p>{weatheData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="wind-icon" />
                    <div>
                        <p>{weatheData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            
            </> : <><h4 className='dev'>Loading City...</h4></>}
            
        </div>
    )
}

export default Weather
