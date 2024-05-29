import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  //error state which gives error msg
  let [error,setError]=useState("")

  let [selectedFile,setSelectedFile]=useState(null)
  
  //use navigate obj
const navigate=useNavigate()

  let {register,handleSubmit, formState: { errors }}=useForm()

  let formSubmit=(userObj)=>{
    //console.log(userObj)

    //make HTTP POSt reg to save userObj to localAPI

      //create form data object
      let fd=new FormData();

      //append newUSer to fd
      fd.append("user",JSON.stringify(userObj))
      //append selectedFile to fd
      fd.append("photo",selectedFile)


    axios.post("http://localhost:4000/user-api/register-user",fd)
    .then(response=>{
      //console.log(response)
      if(response.status===201){
        navigate("/login")  //Programmatical navigation on successful registeration
      }
      if(response.status!==201){
        setError(response.data.message)
      }

    })
    .catch(err=>{
      console.log("error is ",err)

    //the client was given an error response (5xx,4xx)
    if(err.response){
      setError(err.message)
    }

    //the client never received a response only recieves request(like when server is busy)
    else if(err.request){
      setError(err.message)
    }

    //other errors
    else{
      setError(err.message)
    }
    })
  }

  //on file select
  const onFileSelect=(e)=>{
    setSelectedFile(e.target.files[0])
  }
  //console.log("selectd file : ",selectedFile)
  return (
    <div className='add-user'>
    <p className="display-3 text-center">Register</p>
    {/*Error message using conditional rendering */}
    {
      error.length!==0 && 
      <p className="display-4 text-danger text-center">{error}</p>
    }
    {/* add user form */}
    <div className="row">
      <div className="col-l1 col-sm-8 col-md-6 mx-auto">
        <form onSubmit={handleSubmit(formSubmit)}>
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

          {/* email */}
          <div className="mb-m">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id='email'
              className='form-control'
              {...register("email", { required: true })} />
            {/* validation errors for email */}
            {
              errors.email?.type === "required" && (
                <p className="text-danger fw-bold fs-5">*Email is required</p>
              )
            }
          </div>
       
          {/*image */}

          <div className="mb-3">
            <label htmlFor="image">Select Profile Pic</label>
            <input type="file"
              id='image'
              className='form-control'
              {...register("image", { required: true })} 
              onInput={onFileSelect}
              />

            {/* validation errors for image */}
            {
              errors.name?.type === "required" && (
                <p className="text-danger fw-bold fs-5">*Image URL is required</p>
              )
            }
          </div>

          
          {/* submit button */}
          <div className="text-end m-3"> {/* Align button to the right */}
            <button  className='btn add-user-btn' type="submit">Register</button>
          </div>
          
        </form>

      </div>
    </div>
  </div>
  )
}

export default Register