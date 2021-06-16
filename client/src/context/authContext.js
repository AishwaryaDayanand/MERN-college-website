import React, { useEffect, useState } from 'react'
import axios from "axios";
const AuthContext = React.createContext()

function AuthContextComp(props) {
    const [loggedIn,setLoggedIn]= useState(undefined)
    const [userName,setUserName] = useState('Unauthorised')
    async function getLoggedIn() {

      const loggedInRes = await axios.get("http://localhost:3001/user/loggedIn");  
      setLoggedIn(loggedInRes.data.isLoggedIn);
      setUserName(loggedInRes.data.userName);
    }
    useEffect(()=>{
getLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn,userName}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export  {AuthContextComp};
export default AuthContext;
