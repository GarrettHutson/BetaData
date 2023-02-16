import Route from "./Route"
import React from 'react'

export default function Crag({ crag, climbs, handleRouteContent, showRoutes, displayRoutes }) {

    let routes = climbs.map((obj,i) => <Route key={i} name={obj.name} uuid={obj.uuid} grade={obj.grades} handleRouteContent={handleRouteContent} content={obj.content} />)
    return (
<>

            <li className={`w-2/3`}>
                <h2 id="crag" className={` ${showRoutes ? 'bg-black text-white border border-white' : 'bg-white text-black' } hover:bg-black hover:text-white p-1 text-center text-2xl`} onClick={() =>displayRoutes(crag)} >{crag}</h2>
                <ul className={`${showRoutes ? 'block' : 'hidden'} bg-black  text-center text-white text-opacity-30`} id="routeList">
                    {routes}
                </ul>
            </li>

</>

    )
}