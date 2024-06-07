import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate= useNavigate()
    const [time,setTime]=useState(new Date())
    useEffect(()=>{
        setInterval(()=>{
            updateTime()
        },1000)
    },[])
    const updateTime = () => {
        setTime(new Date());
    };
    const logoutfn=()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
  return (
    <>
    <div className='h-16 w-full bg-black text-white flex justify-between font-thin'>
        <div className='content-center pl-5'>
            PLANNER
        </div>
        <div className="content-center">
            <h2>{time.toLocaleString()}</h2>
        </div>
        <div className=' content-center pr-5'>
            <button onClick={logoutfn}>
                LOGOUT
            </button>
        </div>
 
    </div>
    </>
    
  )
}

export default Navbar