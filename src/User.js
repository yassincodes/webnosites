import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import { useLocation } from 'react-router-dom'
import {Center} from '@chakra-ui/react'
import "./SeePage"
function User() {
    const location = useLocation();
    const name = location.pathname.substring(1);

    const [appData, setappData ] = useState()
    useEffect(() => {
      localStorage.getItem('this_uid') 
      && firebase.database().ref(name).on('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        const appData = [];
        for (let id in snapshotVal) {
          appData.push({ id, ...snapshotVal[id] });
        }
        setappData(appData);
      });
    }, [])

    const [usernames, setUsernames] = useState();
    useEffect(() => {
      localStorage.getItem("this_uid") 
      && firebase
      .database()
      .ref("usernames").on('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        const usernames = [];
        for (let id in snapshotVal) {
          usernames.push({ id, ...snapshotVal[id] });
        }
        setUsernames(usernames);
      });
    }, []);

    // this code will get all the username 
    // so that if the username do not exist we will tell the user 
    // sorry .. this username do not exist
    const theUsernames = []
    usernames && usernames.map((user) => {
        theUsernames.push(user.username)
    })
    

    if (appData && appData.length >= 1) {
      return (
        <div className="see_page" style={{border:"none", marginLeft:"13vw", marginRight:"13vw"}}>
         
          <Center className="see_page_header">
              <img name='' style={{borderRadius:"50%", marginBottom:"1.5vh"}} src={appData && appData[0].photoURL} />
              {appData && appData[0].displayName}
          </Center>

          <p style={{marginLeft:"5.5vw", marginBottom:"1vh", marginTop:"3vh"}}>
          {appData && appData[0].iamValue}
          </p>
          {(appData && appData.length > 0) ? appData.map(appData => {
               return <div className="see_page_oneData" 
                     style={appData.text 
                     ? {margin:"1.5vh 6vw", padding:"1.5vh 3vw", background:"lightblue", borderRadius:"10px", color:"black"} : {color:"black"}}>
                     {appData.text}
                      </div>
          }) : "loading..." }
        </div>
    ) 
    } else if (theUsernames.length >= 1 && theUsernames.includes(name) === false) {
      return (
      <div>
       sorry this username do not exist
       <button>join</button>
      </div>
      )
    } else {
      return( 
      <div style={{display:"flex", justifyContent:"Center", alignItems:"Center", height:"100vh"}}>
          loading...
      </div>
    )}
}

export default User