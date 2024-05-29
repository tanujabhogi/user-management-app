import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    let error=useRouteError();
    console.log(error)

  return (
    <div className='text-center text-danger'>
        <h1>Oops!...</h1>
        <p>Unexpected error</p>
        <p>{error.statusText}</p>
    </div>
  )
}

export default ErrorPage