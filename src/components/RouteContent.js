
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function RouteContent({loggedIn, data, route, cragId, addComment, user,setUserData }) {
    const [allComments, setAllcomments] = useState([])
    const [comment, setComment] = useState('')
    const [projecting, setProjecting] = useState([])

    let deletedComment;
    let deletedObj;
    const handleDelete = (id) => {
        const newComments = [...allComments]
       
        deletedComment = newComments.filter(obj =>{
           if(obj._id !== id) return obj
           else deletedObj = obj
        } )
        return deleteComment()

    }
    let deletedProjecting;
    const handleProjecting = (user) => {
        const newProjecting = [...projecting]
        deletedProjecting = newProjecting.filter(obj=> obj.user !== user)
        return deleteProjecting()
    }


    let climbName = route.replace(/\s+/g, "-").toLowerCase();

    const handleComment = (e) => setComment(e.target.value)
    useEffect(() => {
        async function getComments() {
            try {
                let res = await fetch(`/climbs/getAll/${climbName}`,
                    { method: 'GET', })
                res = await res.json();
                console.log(res, 'commentsarray')
                if(res.length){
                    setAllcomments(res[0].comments)
                }
               
            } catch (error) {
                console.log(error)
            }
        }
        async function getProjecting(){
            try {
                let res = await fetch(`/climbs/getProjecting/${climbName}`,
                    { method: 'GET', })
                res = await res.json();
                console.log(res, 'projectingarr')
                if(res.length){
                    setProjecting(res[0].projecting)
                }
             
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
        getProjecting()
    }, [])
    
        async function addProjecting() {
            try {
                let res = await fetch(`/climbs/addProjecting/${climbName}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'Application/JSON'
                        },
                        body: JSON.stringify({
                            user: user
                        })
                    })
                res = await res.json();

                setProjecting(res.projecting)
                
                setUserData(res.user)

            } catch (error) {
                console.log(error)
            }
        }
   
    async function deleteComment() {
        try {
            let res = await fetch(`/climbs/deleteComment/${climbName}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                    body: JSON.stringify({
                        comments: deletedComment,
                        deletedObj: deletedObj

                    })
                })
            res = await res.json();
            setAllcomments(res.deleted)
            setUserData(res.user)

        } catch (error) {
            console.log(error)
        }
    }
    async function deleteProjecting() {
        try {
            let res = await fetch(`/climbs/deleteProjecting/${climbName}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                    body: JSON.stringify({
                        projecting: deletedProjecting,
                        user:user
                    })
                })
            res = await res.json();
            setProjecting(res.deleted)
            setUserData(res.user)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        setComment('')
    }, [allComments])

    async function addComment(climbName) {
        try {
            let res = await fetch(`/climbs/${climbName}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                    body: JSON.stringify({
                        user: `${user}`,
                        comment: `${comment}`
                    })
                })
            res = await res.json();
            setAllcomments(res.comments)
            setUserData(res.user)
        } catch (error) {
            console.log(error)
        }
    }


    function handleBookMark(id){
           const newArr = allComments.filter(obj=> obj._id === id);
           async function bookMarkComment(){
            try{

               let res = await fetch('/user/bookmark',
                {
                    method:'PATCH',
                    headers: {
                        'Content-Type': 'Application/JSON'
                    },
                    body :JSON.stringify( {
                        user: user,
                        climb: route,
                        author: newArr[0].user,
                        comment:  newArr[0].comment
                    })
                })
                res = await res.json();
                setUserData(res)
            }
            catch (error) {
                console.log(error)
            }
        }
        bookMarkComment()
    }
       
    let chosenClimb;
    let climbsArr;
    const arr = data.data.areas[0].children
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].area_name === cragId) {
            climbsArr = arr[i].climbs;
            break;
        }
    }
    for (let i = 0; i < climbsArr.length; i++) {
        if (climbsArr[i].name === route) {
            chosenClimb = climbsArr[i]
            break;
        }
    }

    let commentsDisplayed = allComments.map(obj => {
        return (
            <>
                <div  className="flex flex-col  ">
                    <h3 className="text-xl text-bold">{obj.user}</h3>
                    <div className="flex flex-col justify-between">
                    <div className="flex justify-between">

                    <p onClick={()=>handleBookMark(obj._id)} key={obj._id}  className="mr-auto">{obj.comment}</p>
                    <i  onClick={() => handleDelete(obj._id)} id={obj._id} class="mr-4 fa-regular fa-trash-can"></i>
                    </div>
                    </div>

                </div>

            </>
        )
    }).reverse()
    let projectingDisplayed = projecting.map(obj =>{

        return(
            <div   className="flex justify-between">
                 <div>{obj.user}</div>
                 <i onClick={() => handleProjecting(obj.user)} class="mr-4 fa-regular fa-trash-can"></i>
            </div>
        )
    })

    if (allComments === []) return <div>loading</div>
    return (
    
    <div className="m-6">
    {loggedIn ? <h1 className="text-center text-xl font-bold">Hello, {`${user.charAt(0).toUpperCase().concat(user.substring(1))}`}</h1> : null}
  
  <div className="mt-4 text-3xl">{`${cragId}`}</div>
  <h1 className="text-4xl underline mt-4">{chosenClimb.name}</h1>
  <div className="mt-4 font-bold text-xl">{`Grade: ${chosenClimb.grades.yds}`}</div>
  <h2 className="text-2xl my-3 font-bold">Route description:</h2>
  <p className="text-2xl italic mt-4">{chosenClimb.content.description}</p>
  <div className="mt-4">{`Protection:${chosenClimb.content.protection}`}</div>
<div className="flex w-screen pb-6">

    <div className="w-1/2 overflow-auto  mt-4 ml-4 mr-2">
    <h2>Beta:</h2>
  <div className="flex flex-col border h-36 overflow-y-auto">
    {commentsDisplayed}
  </div>
    </div>
<div className="w-1/2 overflow-auto mt-4 ml-2 mr-4">

<h2>Currently Projecting:</h2>
<div className="flex flex-col border  h-36 overflow-y-auto">
{projectingDisplayed}
  </div>
  {loggedIn ? 
 <button 
    type='button' 
    className="mt-4 py-2 px-4 bg-black  border-black border-2 hover:bg-slate-500 text-white font-bold rounded"
    onClick={() => addProjecting()}>
    Projecting
  </button>
  : null
  }

</div>
</div>


{loggedIn ?
<>
<label htmlFor="comment" className="mt-8">Add Your Beta:</label>
  <textarea 
    name="comment" 
    type="text" 
    onChange={(e) => handleComment(e)} 
    className="border w-full h-32 mt-2"
    value={comment}
  />

    <button 
    type='button' 
    className="mt-4 py-2 px-4 hover:bg-slate-500 bg-black text-white font-bold rounded"
    onClick={() => addComment(climbName)}
  >
    Add Beta
  </button>

</>
  :
  <>


  <h2 className="mb-4">Must have an account to participate. </h2>
  <Link    className="mt-4 py-2 px-4 bg-slate-500 hover:bg-black text-white font-bold rounded" to="/signup">Sign Up</Link>
  <Link   className="mt-4 py-2 px-4 bg-white  border-black border-2 hover:bg-slate-100 text-black font-bold rounded" to="/login">Log In</Link>
  </>
}

</div>

    )
}


//     <>
    //         <h1 className="text-xl">Hello {user}</h1>
    //         <h1 className="text-4xl underline">{chosenClimb.name}</h1>
    //         <p className="text-2xl italic">{chosenClimb.content.description}</p>
    //         <div>{chosenClimb.content.protection}</div>
    //         <div>{chosenClimb.location}</div>
    //         <div>{chosenClimb.grades.yds}</div>

       
    //    <div className="flex flex-col border w-1/2 h-60 overflow-auto">
    //         {commentsDisplayed}
    //    </div>
    //         <div>{projectingDisplayed}</div>
    //         <label for="fname">Comment:</label>
    //         <textarea name="fname" typeof="text" onChange={(e) => handleComment(e)} className="w-24 h-24 border" value={comment}></textarea>
    //         <input type='submit' value='submit' onClick={() => addComment(climbName)} />
    //         <input type='submit' value='addprojecting' onClick={() => addProjecting()} />
            







    //     </>