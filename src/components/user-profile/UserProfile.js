import React, { useState } from 'react'
import './UserProfile.css'
import { useContext } from 'react'
import axios from 'axios'
import { logincontext } from '../../contexts/loginContext'


function UserProfile() {


  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(logincontext)

  let [err,setErr]=useState("")

  let [data,setData]=useState("")

  console.log(currentUser)

  //get token from local storage
  //as we have given "token" as key
  let token =localStorage.getItem("token")

  //get data from protected route
  const getProtectedData=()=>{
    axios.get("http://localhost:4000/user-api/test",{headers:{"Authorization":"Bearer "+token}})
    .then(response=>{
          setData(response.data.message)
      })
    .catch(err=>{
        setErr(err.message)
      })
  }

  return (
    <div>
      <p className="display-4 text-end text-primary">Welcome, {currentUser.username}</p>

      <img src={currentUser.image} width="60px" className="float-end" alt="" />

      {/*add products and cart links here */}
      {/*nav links*/}

      <button className="btn btn-danger mx-auto" onClick={getProtectedData}>Get Protected Data</button>

      <h1>{data}</h1>

    </div>
  )
}

export default UserProfile