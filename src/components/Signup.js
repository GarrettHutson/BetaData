import React from "react";


export default function Sigup({ handlePassword, handleUsername, createUser,username, password, projectGrade,handleProjectGrade,}){

    return(
        <>
        
        <div className="mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4">
        <h1 className="text-4xl text-bold">Create an Acount</h1>
         <input className="text-center border border-blue-500 black w-48 " name="username" onChange={(e)=>handleUsername(e)} value={username} placeholder='username' type='text'/>
        <input className="text-center border border-blue-500 black w-48 " name="password" onChange={(e)=>handlePassword(e)} value={password} placeholder='password' type='password'/>
        <input className="text-center border border-blue-500 black w-48 " name="projGrade" onChange={(e)=>handleProjectGrade(e)} value= {projectGrade} placeholder='projct grade' type='text'/>
        <button className="text-center cursor-pointer hover:bg-white hover:text-black bg-black text-white border border black w-48 " onClick={()=>createUser()} >signup</button>
        </div>
        </>
    )
}


