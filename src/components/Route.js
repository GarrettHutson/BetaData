import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import RouteContent from './RouteContent'

export default function Route({handleRouteContent ,name, grade, uuid}){

    return(
        <li onClick={()=>handleRouteContent(name)}  className='transition duration-200 ease-in-out transform hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:text-white'>
        <Link to='/content' >
        {name}
        <span>{grade.yds}</span>
        </Link>
        </li>
    )
}