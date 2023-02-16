import React from "react";
import { Outlet, Link } from "react-router-dom";


export default function Nav({ signedIn, loggedIn, signout }) {

  return (
    <>
      <nav className="w-screen h-32 bg-black text-white flex justify-between items-center px-4">
        <Link to="/" className="ml-6">betaData</Link>
        {signedIn || loggedIn ?
          <div>
            <Link to="/signout" onClick={()=>signout()} className="mr-6">Sign Out</Link>
          </div>
          :

          <div className="flex flex-col gap-2">
            <Link to='/login' className="cursor-poiner hover:bg-slate-600 hover:text-white  text-center h-fit p-1 mr-6  w-24 rounded-2xl bg-white text-black ">Login</Link>
            <Link to='/signup' className="cursor-poiner hover:bg-slate-600 hover:text-white text-center h-fit p-1 mr-6 w-24  rounded-2xl bg-white text-black ">Sign Up</Link>
          </div>


        }
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}