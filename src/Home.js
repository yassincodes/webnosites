import React, {useContext} from "react"
import { authContext } from "./contexts/authContext"
import firebase from "./firebase"
import { Link } from "react-router-dom"
import "./Home.css"
function Home() {
    const { signInWithGoogle } = useContext(authContext)

    function sendData() {
      firebase.database().ref("usernames" + "/" + "someone").set({
        username: "someone"
      })
    }

    return (
        <div className="home_page">
            <h1>myresolutions</h1>
            <div>
              <Link 
                to="/admin" 
                onClick={signInWithGoogle}  
                className="login-with-google-btn" 
              >
            Continue with google</Link>
            </div>     
            <button onClick={sendData}>send</button>  
        </div>
    )
}

export default Home