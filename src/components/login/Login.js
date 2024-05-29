import React, { useState , useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { logincontext } from '../../contexts/loginContext'


function Login() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(logincontext)


  
  //use navigate obj
const navigate=useNavigate()

  let {register,handleSubmit, formState: { errors }}=useForm()
  
  //user login
  let handleUserLogin=(userCredObj)=>{

    //console.log("user credential obj : ",userCredObj)
    
    //send userCredObj to store
    loginUser(userCredObj)
  }

  useEffect(()=>{
    if(userLoginStatus===true){
      navigate('/user-profile')
    }

  },[userLoginStatus])

  //console.log("current user obj :",currentUser)


  return (
    <div className='add-user'>
    <p className="display-3 text-center">Login</p>
    {/*Error message using conditional rendering */}
    {
      error.length!==0 && 
      <p className="display-4 text-danger text-center">{error}</p>
    }
    {/* add user form */}
    <div className="row">
      <div className="col-l1 col-sm-8 col-md-6 mx-auto">
        <form onSubmit={handleSubmit(handleUserLogin)}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input type="text"
              id='username'
              className='form-control'
              {...register("username", { required: true })} />

            {/* validation errors for name */}
            {
              errors.name?.type === "required" && (
                <p className="text-danger fw-bold fs-5">*Username is required</p>
              )
            }
          </div>
            {/* Password */}
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password"
              id='password'
              className='form-control'
              {...register("password", { required: true })} />

            {/* validation errors for password */}
            {
              errors.name?.type === "required" && (
                <p className="text-danger fw-bold fs-5">*Password is required</p>
              )
            }
          </div>

       
          
          {/* submit button */}
          <div className="text-end m-3"> {/* Align button to the right */}
            <button  className='btn add-user-btn' type="submit">Login</button>
          </div>
          
        </form>

      </div>
    </div>
  </div>
  )
}

export default Login