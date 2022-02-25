import React, {useState, useEffect, useContext} from "react"
import { authContext } from "./contexts/authContext"
import { windowNumberContext } from "./contexts/windowNumberContext"
import firebase from "./firebase"
import Info from "./components/Info"
import Navigation from "./components/Navigation"
import Copy from "./components/Copy"
import SeePage from "./SeePage"
import {useToast} from '@chakra-ui/react'
import "./Admin.css"
import "./SeePage.css"
import {useWindowWidth} from '@react-hook/window-size'
function Admin() {

    const toast = useToast()

    // importing the data from the contexts //
    const { email, displayName, photoURL, uid} = useContext(authContext)
    const { windowNumber } = useContext(windowNumberContext)


    // getting the width of the screen (980 max widht) //
    const width = useWindowWidth()


    // getting the username and the name //
    const [theUsername, setTheUsername] = useState("")
    const [text, setText] = useState("")
 
    // storing the data when the user clicks the "join" button //
    useEffect(() => {
      if ( email && uid) {
        firebase.database().ref(localStorage.getItem("this_uid") + "/" + "0").set({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL
          })
        }
    }, [email, uid])


    // getting the data that we have stored in the step before //
    const [dataCenter, setDataCenter] = useState();
    useEffect(() => {
      localStorage.getItem("this_uid") 
      && firebase
      .database()
      .ref(localStorage.getItem("this_uid")).on('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        const dataCenter = [];
        for (let id in snapshotVal) {
          dataCenter.push({ id, ...snapshotVal[id] });
        }
        setDataCenter(dataCenter);
      })
    }, [localStorage.getItem("this_uid"), uid]);


    // getting the list of all usernames //
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
    }, [localStorage.getItem("this_uid")]);

      
    // getting appData ( contains all the data generated by your users who use the app ) //
    const [appData, setappData] = useState()
    useEffect(() => {
      localStorage.getItem('this_uid') 
      && dataCenter
      && (dataCenter.length === 2)
      && firebase.database().ref(dataCenter[1].username).on('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        const appData = [];
        for (let id in snapshotVal) {
          appData.push({ id, ...snapshotVal[id] });
        }
        setappData(appData);
      });
    }, [dataCenter && dataCenter.length])



    // putting appData in a list to work with in the future //
    const theAppData = []
    appData && appData.map((oneData) => {
      if (oneData.text !== "") {
        theAppData.push(oneData.text)
      }   
    })


    // getting all the usernames of your webnosite //
    const theUsernames = []
    usernames && usernames.map((user) => {
        theUsernames.push(user.username)
    })



    // function responsible for creating the username //
    // (this function will appear only once) //
    function createAUsername() { 
        if ( usernames && dataCenter && theUsernames.includes(theUsername)) {
          alert("that username exists")
        } else if (theUsername.toUpperCase() === "ADMIN") {
          alert("sorry, you can't use that username")
        } else if (theUsername.length > 18) {
          alert("username should not be longer then 18 characters")
    /* important note: try to make it acceptable only if username matches 
    a-z0-9_. (I should learn more about regex) */
        } else if (usernames && dataCenter && theUsername.match("^[A-Za-z0-9_]+$")) {
        firebase.database().ref(localStorage.getItem("this_uid") + "/" + "1").set({
          username: theUsername,
        })
        firebase.database().ref(theUsername + "/" + "0").set({
          username: theUsername,
          uid: dataCenter[0].uid,
          displayName: dataCenter[0].displayName,
          photoURL: dataCenter[0].photoURL,
          email: dataCenter[0].email
        })
        && firebase.database().ref("usernames" + "/" + theUsername).set({
          username:theUsername
        })
        } else {
          alert("username should only contain characters and numbers")
        }
    }

    // this function give as the textID wich equal to the length
    const theLength = appData && appData.length
    const [textId, setTextId] = useState(theLength)


    // this function is responsible of sending the text
    function sendText() {
      setText("")
      theLength 
      && dataCenter[1].username === appData[0].username
      && dataCenter[0].uid === appData[0].uid
      && firebase
      .database()
      .ref(appData[0].username + "/" + theLength).set({
        id: theLength,
        text: text
      })
        toast({
          title: 'one data pushed to the database',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
    }
    
    // deleting the text //
    // when the user clicks on delete we will get the id of the deleted text
    // and store it textID
    // example : if the user deletes text number 5 => the textID will be 5
    // after that the useEffect will trigger 
    // in the useEffect we will change the text with textID from "something written" to ""
    useEffect(() => {
      textId       
      && dataCenter[1].username === appData[0].username
      && dataCenter[0].uid === appData[0].uid
      && firebase
          .database()
          .ref(appData[0].username + "/" + textId)
          .set({
              id: textId,
              text: ""
          })
      }, [textId])

    // ----------------xx11---------------- //
    if (dataCenter && dataCenter.length === 2 ) {
      return (
        <>
        <div style={width > 980 ? {display:"flex", fontFamily:" 'Varela Round', sans-serif"} : {display:"flex", flexDirection:"column"}}>

          <div style={width > 980 ? {width:"6%", height:"100vh"}: {width:"100%"}}>
            <Info data={appData}/>
          </div>

          {(width <= 980 && appData) && <Copy />}

          <div style={width > 980 ? {width:"54%", background:"#EAEDED"} : {height:"100vh", width:"100%", background:"#F8F8F8"}}> 
            <div className={width > 980 ? "sticky" : "normal"}>
              <Navigation />
            </div>

            {(windowNumber === 1) 
            ? <div>
                <div style={{display:"flex", flexWrap:"wrap", marginBottom:"2em", width:"80%", marginLeft:"10%", marginTop:"3.5vh", padding:"3vh", borderRadius:"10px", background:"white"}}>
                  <input type="text" placeholder="write something" onChange={(e) => setText(e.target.value)} value={text}/>
                  <button onClick={sendText}>share</button>
                </div>
                <div style={{display:"flex", flexDirection:"column",marginTop:"6.6vh"}}>
                {(appData && appData.length > 1) 
                ? appData.map((oneData, key) => {
                    return (
                      <div index={key} style={oneData.text ? {display:"flex", flexDirection:"row", justifyContent:"space-between", width:"80%", marginLeft:"10%",marginBottom:"1vh",marginTop:"1vh",padding:"3vh",borderRadius:"10px",background:"white" } : {display:"flex", flexDirection:"row", justifyContent:"space-between", width:"80%",marginLeft:"10%"}} className="oneData_box_shadow" >
                      {oneData.text ? <div>{oneData.text}</div> : ""}
                        <div>
                          {oneData.text && <button onClick={() => setTextId(oneData.id)}>delete</button>}
                        </div>
                    </div>) }) 
                : (appData && appData.length === 1) 
                ? <div style={{display:"flex", flexDirection:"column"}}> 
                    <div style={{ width:"80%",marginLeft:"10%", marginBottom:"1vh", marginTop:"1vh", padding:"3vh",borderRadius:"10px",background:"white"}}>
                      you'll see what users say about you here ( you can edit )
                    </div>
                  </div>
                : "something here to tell user its loading"}
                </div>
                </div>
              
              : (windowNumber === 2) 
              ? <div> here we will show the appearance of the page </div>
              
              : <div> here we will show the statics of the page </div>
            }
          </div>
          {(width > 980 && appData )
          ? <div style={{display:"flex", flexDirection:"column", width:"40%",height:"100vh", borderLeft:"1px solid black", position: "fixed", right:"0", width:"40%", overflowY:"scroll"}}>
              
              <Copy />

              <div className="see_page" style={(appData && theAppData.length < 8 ) ? {height:"100vh"} : {height:"auto", paddingBottom:"5vh"}}>
              <div>
                <div className="see_page_header">
                    <div><img name='' style={{borderRadius:"50%", marginBottom:"1.5vh"}} src={appData && appData[0].photoURL} /></div>
                    <div>{appData && appData[0].displayName}</div>
                </div>
                {appData && appData.map((oneData) => { return <div className="see_page_oneData" style={oneData.text ? {margin:"1.5vh 6vw", padding:"1.5vh 3vw", background:"lightblue", borderRadius:"10px", color:"white"} : {color:"black"}}>{oneData.text}</div>})}
              </div>
              </div> 
              
            </div> 
          : appData && <div style={{display:"flex", justifyContent:"center"}}><div style={{position:"fixed", bottom:"0", marginBottom:"3vh"}} ><SeePage data={appData} theData={theAppData} /></div></div>}
        </div>
        </>
  )} else if (dataCenter && dataCenter.length === 1) {
      return (
        <div className="username_page">
          we are almost done,
          just choose a username :)
          <div>
              <input 
                type="text"
                onChange={(e) => setTheUsername(e.target.value)}
                placeholder="your username"
                value={theUsername} 
              />
              <button onClick={createAUsername}>create my account</button>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{display:"flex", justifyContent:"Center", alignItems:"Center", height:"100vh"}}>
          loading....
          {
            // why no calculate the time here 
            // if the time passes 9 seconds a message will appear 
            // with a restart button
          }
        </div>
      )
    }
}

export default Admin