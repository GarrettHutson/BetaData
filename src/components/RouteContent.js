
import React, { useEffect, useState } from "react"

export default function RouteContent({ data, route, cragId, addComment, user }) {
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
                setAllcomments(res[0].comments)
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
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

                setProjecting(res)

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
            // console.log('res is', res)
            setAllcomments(res)

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
            console.log('res is', res)
            setProjecting(res)

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
            setAllcomments(res)

        } catch (error) {
            console.log(error)
        }
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
                <div onClick={() => handleDelete(obj._id)} id={obj._id}>
                    <h3 className="text-purple-400">{obj.user}</h3>
                    <p className="text-red-500">{obj.comment}</p><span>trashcan</span>

                </div>

            </>
        )
    })
    let projectingDisplayed = projecting.map(obj => <div onClick={() => handleProjecting(obj.user)}>{obj.user}</div>)

    if (allComments === []) return <div>loading</div>
    return (
        <>
            <h1>{user}</h1>
            <h1>{chosenClimb.name}</h1>
            <p>{chosenClimb.content.description}</p>
       
            {commentsDisplayed}
            <div>{projectingDisplayed}</div>
       



            <label for="fname">Comment:</label>
            <textarea name="fname" typeof="text" onChange={(e) => handleComment(e)} className="w-24 h-24 border" value={comment}></textarea>
            <input type='submit' value='submit' onClick={() => addComment(climbName)} />
            <input type='submit' value='addprojecting' onClick={() => addProjecting()} />
            







        </>
    )
}