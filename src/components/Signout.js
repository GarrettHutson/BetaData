import React from "react";


export default function Signout({userData}){

    return(
        <>
        <h1 className="text-center mt-24 text-4xl text-slate-600">{`User: ${userData.username} Signed Out `}`.</h1>
      
        </>
    )
}