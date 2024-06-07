import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import SidePanel from "./SidePanel"
import TheBody from "./TheBody"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"



const Main = () => {
    const navigate =useNavigate()
    const [plans,setPlans]=useState([])
    const [completed,setCompleted] =useState(false)
    const [refresh,setRefresh] = useState(0)
    const re=useSelector((store)=>store.addPlan.refre)
  const pageRefresh= ()=>{
    setRefresh(()=>refresh + 1)
  }

  const comple=(t)=>{
    console.log("dfghyujkdffgf",t);
    setCompleted(t)
  }
  console.log(completed);

    useEffect(()=>{
    const token=localStorage.getItem('token')
    if(!token){
      navigate('/')
    }
    
    },[])
    useEffect(()=>{
        const token=localStorage.getItem('token')

        const fetching=async ()=>{
            try {
                await axios.get('http://localhost:3000/home',{
                    headers: {
                        Authorization: `${token}`,
                      }
                })
                .then((response)=>{
                    if(response.status === 200){
                        console.log(response);
                        const plans=response.data.plans
                        if(completed){
                          const donePlans=plans.filter((plan)=>plan.status =='completed')
                          console.log(donePlans);
                          setPlans(donePlans)
                        }
                        else{

                          setPlans(plans)
                        }
                    }
                })
                .catch((error)=>{
                    if(error.response){
                        alert(error.response.data.message)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
        fetching()

    },[refresh,re,completed])
  return (
    <>
    <Navbar/>
    <div className="flex-grow bg-white flex">
    <SidePanel fn={comple}/>
    <TheBody plans={plans} completed={completed} pageRefresh={pageRefresh}/>
    </div>
    
    </>
  )
}

export default Main