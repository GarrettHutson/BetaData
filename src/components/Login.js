import React from "react";


export default function Login({ handleLoginPassword, login, setLoggedin, handleLoginUser, loginUsername, loginPassword }) {

    return (
        <>


            <div className="mt-24 w-1/2 h-96 mx-auto border border-black flex flex-col items-center justify-center align-middle gap-4">
                <h1 className="text-4xl text-bold">Log In</h1>
                <input className="text-center border border-blue-500 black w-48 " onChange={(e) => handleLoginUser(e)} type='text' placeholder="username" value={loginUsername} />
                <input className="text-center border border-blue-500 black w-48 " onChange={(e) => handleLoginPassword(e)} type='password' placeholder="password" value={loginPassword} />
                <input className="text-center cursor-pointer hover:bg-white hover:text-black bg-black text-white border border black w-48 " value='login' onClick={() => login()} />

            </div>
        </>
    )
}