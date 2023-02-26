import React from "react";
import { Outlet, Link } from "react-router-dom";


export default function Nav({ signedIn, loggedIn, signout }) {

  return (
    <>
      <nav className="w-screen h-32 bg-black text-white flex justify-between items-center px-4">
        {signedIn || loggedIn ?
        <Link to="/profile">Profile</Link>
        :
        <Link to='/login' className="cursor-poiner hover:bg-slate-600 hover:text-white  text-center h-fit p-1 mr-6  w-24 rounded-2xl bg-white text-black ">Login</Link>

        }
        <Link to="/" className="ml-6 text-2xl">betaData</Link>


        {signedIn || loggedIn ?
            <Link to="/signout" onClick={()=>signout()} className="mr-6">Sign Out</Link>
            :
            <Link to='/signup' className="cursor-poiner hover:bg-slate-600 hover:text-white text-center h-fit p-1 mr-6 w-24  rounded-2xl bg-white text-black ">Sign Up</Link>
        }
      </nav>
    </>
  )
}