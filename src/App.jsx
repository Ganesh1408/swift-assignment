
  import { BrowserRouter,Routes,Route } from 'react-router-dom'
  import CommentsDashboard from './Components/CommentsDashboard'
  import Header from './Components/Header'
  import ProfileScreen from './Components/ProfileScreen'
  import './App.css'
import { useEffect, useState } from 'react'

  function App() {
    // const [count, setCount] = useState(0)

     const [profiledata,setProfileData] = useState([])
    
        const fetchProfileData=async()=>{
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if(!response.ok){
                    throw new Error('failed to fetch the data')
                }
                const profile = await response.json()
                setProfileData(profile)
               
    
            }catch(error){
                console.log(error)
            }
             
        }
    
        useEffect(()=>{
            fetchProfileData()
        },[])

    return (
      <BrowserRouter>
        {profiledata.length >0 &&<Header profiledata={profiledata[0]}/>}
      <Routes>
        <Route path="/profile" element={<ProfileScreen profiledata={profiledata[0]}/>}/>
        <Route path="/" element={<CommentsDashboard/>}/>
      </Routes>
        
        
        
      </BrowserRouter>
    )
  }

  export default App
