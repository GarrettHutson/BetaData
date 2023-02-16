import React from "react";


export default function Login({handleLoginPassword,login, setLoggedin, handleLoginUser,loginUsername,loginPassword}){

    return(
        <>
     
            <input onChange={(e)=>handleLoginUser(e)} type='text' placeholder="username" value={loginUsername} />
            <input  onChange={(e)=>handleLoginPassword(e)} type='password' placeholder="password" value={loginPassword} />
            <button onClick={()=>login()} >login</button>
        </>
    )
}