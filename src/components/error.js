import { useRouteError } from "react-router-dom";
import React from "react";
export default function Error(){
    const error = useRouteError();
    return(
        <>
        <main className="flex flex-col items-center align-middle">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>
        <i>{error.statusText || error.message}</i>
      </p>
        </main>

        </>
    )
}