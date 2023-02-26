
import React, { useEffect } from "react"

export default function Profile({ userData }) {
  const { username, projectGrade, beta, projectlist, bookmarkedBeta } = userData

  // useEffect(() => {}, [userData])

  let comments = beta.map((obj) => {
 
    return (
        <>
        <div className="my-4 px-4 py-2 bg-gray-100 rounded">
        <div className="font-bold">{`${obj.climb}:`}</div>
    <div >{obj.comment}</div>
        </div>
        </>

  )})
  let bookmarks = bookmarkedBeta.map(obj => (
    <>
    <div className="my-4 px-4 py-2 bg-gray-100 rounded">

    <div className="font-bold">{`${obj.climb}:`}</div>
    <div className="font-bold">{obj.author}</div>
         
    <div>{obj.comment}</div>

    </div>
    </>
  ))

  let projects = projectlist.map((obj) => (
    <div className="my-4 px-4 py-2 bg-gray-100 rounded">{obj.name}</div>
  ))

  return (
    <div className="max-w-lg mx-auto ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{username}</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600">{projectGrade}</h2>
          <div className="bg-blue-500 text-white py-1 px-4 rounded-full text-sm">
            betaData user
          </div>
        </div>
      <div className="bg-white shadow-md flex gap-4 rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Beta:</h3>
          {comments}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Bookmarked Beta:</h3>
          {bookmarks}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Projects:</h3>
          {projects}
        </div>
      </div>
    </div>
  )
}
