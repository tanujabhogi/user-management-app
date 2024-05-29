import React from 'react'
import { useState } from 'react'
import { logincontext } from '../contexts/loginContext'
import axios from 'axios'

function UserLoginContextStore({children}) {
    let [currentUser,setCurrentUser]=useState({})
    let [error,setError]=useState("")       //as we get error as error msg which is a string
    let [userLoginStatus,setUserLoginStatus]=useState(false)

    //user login
    const loginUser=(userCredObj)=>{
        axios.post('http://localhost:4000/user-api/login-user',userCredObj)
        .then(response=>{
            //console.log("response of login user :",response)
            if(response.data.message==="success"){
                
                //response contains : message,token,user
                //update current User state
                setCurrentUser({...response.data.user})

                setUserLoginStatus(true)

                //update error status
                setError("")     //indicating no to display any error msg
                

                //save jwt token in browser storage(local or session storage)
                localStorage.setItem("token",response.data.token)   //key value pair
                
                

            }else{
                //for displaying error message on webpage
                setError(response.data.message)
            }
        })
        .catch()
    }
    //user logout
    const logoutUser=()=>{
        //clear local or session storage
        localStorage.clear()

        //update user login status
        setUserLoginStatus(false)

        


    }



  return (
    //note the order in which they are sent as values
    <div>
        <logincontext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>       
            {children}
        </logincontext.Provider>
    </div>
  )
}

export default UserLoginContextStore