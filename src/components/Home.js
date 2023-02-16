import React from 'react';
import Crag from './Crag';


export default function Home({data, handleCragId, showRoutes, showCrags, displayRoutes, displayCrag,  handleRouteContent,}) {
    const rifleHeader = data.data.areas[0].area_name;
    const crags = data.data.areas[0].children.map((obj, i) => <Crag key={i} handleCragId={handleCragId} crag={obj.area_name} showCrags={showCrags} showRoutes={showRoutes === obj.area_name} handleRouteContent={handleRouteContent} displayRoutes={displayRoutes} climbs={obj.climbs} />)

  return (
       <div className='w-screen h-screen'>
   
    
     
 
      <h1 className='text-4xl text-center'>{rifleHeader}</h1>
   <div className='w-2/3 h-2/3 text-2xl rounded-2xl flex flex-col items-center   border mx-auto p-4 overflow-auto'>

      <h1 onClick={()=>displayCrag()} className={`${showCrags ? 'bg-black'  : 'bg-white text-black border border-2'}border  hover:cursor-pointer rounded-xl w-1/2 text-center hover:bg-slate-800 hover:text-white`}>Walls</h1>
        <ul className={`${showCrags ? 'block' : 'hidden' } hover:pointer w-3/4 rounded border flex flex-col items-center`} >

          {crags}
        </ul>

   </div>

     

    </div>
  );
}