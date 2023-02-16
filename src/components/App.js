
import { Routes, Route, useNavigate } from "react-router-dom";
import Error from './error';
import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import Home from './Home'
import RouteContent from './RouteContent'
import Login from './Login'
import Profile from "./Profile";
import Signup from "./Signup";
import Signout from "./Signout";


export default function App() {
  const [data, setData] = useState();
  const [showRoutes, setShowRoutes] = useState(null);
  const [showCrags, setShowCrags] = useState(false)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [projectGrade, setProjectGrade] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [route, setRoute] = useState('')
  const [cragId, setCragId] = useState('')
  const [user, setUser] = useState('')
  const [userData,setUserData] = useState('')
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  const [signedIn, setSignedIn] = useState(false)


  function createUser() {
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        projectGrade: projectGrade
      })
    })
      .then(res => res.json())
      .then(setLoggedIn(true))
      return navigate("/")
  }


  async function login() {
    try {
      let res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(
          {
            username: loginUsername,
            password: loginPassword
          }
        )
      })
      res = await res.json()
      setUser(res.username);
      setLoggedIn(true)
      setUserData(res)
      return navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  const signout = () => {
    setLoggedIn(false)
    setUser('')
  }

  const handleUsername = (e) => setusername(e.target.value)
  const handleProjectGrade = (e) =>  setProjectGrade(e.target.value) 
  const handlePassword = (e) => setpassword(e.target.value)
  const handleLoginUser = (e) => setLoginUsername(e.target.value)
  const handleLoginPassword = (e) => setLoginPassword(e.target.value)
  const displayRoutes = (crag) => {
    setShowRoutes(crag === showRoutes ? null : crag)
    setCragId(crag)
  }
  const displayCrag = () => setShowCrags(!showCrags)
  const handleRouteContent = (name) => setRoute(name)

  useEffect(() => {
    const fetchData = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query:
          "query MyQuery {\n  areas(filter: {area_name: {match: \"Rifle Mountain Park\", exactMatch: true}}) {\n    area_name\n    totalClimbs\n    children {\n      area_name\n      totalClimbs\n      climbs {\n        name\n    grades {\n yds  \n}     uuid\n        content {\n          description\n          location\n          protection\n        }\n        grades {\n          yds\n        }\n      }\n    }\n  }\n}",
        variables: {},
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://stg-api.openbeta.io",
          requestOptions
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])


  if (!data) return (
    <div>loading</div>
  )
  return (
    <div>
      <Nav signedIn={signedIn} loggedIn={loggedIn} signout={signout} />
      <Routes >
        <Route path="/" element={<Home data={data} showRoutes={showRoutes} showCrags={showCrags} displayRoutes={displayRoutes} displayCrag={displayCrag} handleRouteContent={handleRouteContent} handleProjectGrade={handleProjectGrade} />} />
        
        <Route path="/content" element={<RouteContent data={data} route={route} cragId={cragId} user={user} />} />
        <Route path="/profile" element={<Profile  userData={userData}   />} />

        <Route path="/signout" element={<Signout />} />
        <Route path="/signup" element={<Signup  setSignedIn={setSignedIn} createUser={createUser}  username={username} password={password} handlePassword={handlePassword} handleUsername={handleUsername}     />} />
        <Route path="/login" element={<Login user={user} setLoggedIn={setLoggedIn} login={login} loginUsername={loginUsername} loginPassword={loginPassword} handleLoginPassword={handleLoginPassword} handleLoginUser={handleLoginUser} />} />
      <Route path="/*" element={<Error />} />
      </Routes>
    </div>

  )
}
