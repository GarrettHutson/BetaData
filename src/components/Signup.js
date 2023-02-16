import React from "react";


export default function Sigup({ handlePassword, handleUsername, createUser,username, password, projectGrade,handleProjectGrade,}){

    return(
        <>
         <input name="username" onChange={(e)=>handleUsername(e)} value={username} placeholder='username' type='text'/>
        <input name="password" onChange={(e)=>handlePassword(e)} value={password} placeholder='password' type='password'/>
        <input name="projGrade" onChange={(e)=>handleProjectGrade(e)} value= {projectGrade} placeholder='projct grade' type='text'/>
        <button onClick={()=>createUser()} >signup</button>
      
        </>
    )
}