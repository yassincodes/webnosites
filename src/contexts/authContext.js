import React, {useState} from "react"
import firebase from "firebase/compat/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const authContext = React.createContext()

function AuthContextProvider({children}) {

const [email, setEmail] = useState("")
const [displayName, setDisplayName] = useState("")
const [photoURL, setPhotoURL] = useState("")
const [uid, setUid] = useState("")

const firebaseConfig = {
  apiKey: "AIzaSyBx4D50xfCmHoIscoNox_CMFyuoBfpgyfU",
  authDomain: "webnosites.firebaseapp.com",
  projectId: "webnosites",
  storageBucket: "webnosites.appspot.com",
  messagingSenderId: "1017372684306",
  appId: "1:1017372684306:web:e5eff261580260af2d28cb",
  measurementId: "G-MVJH2YEBDL",
  databaseURL:"https://webnosites-default-rtdb.europe-west1.firebasedatabase.app"
};
  
const app = firebase.initializeApp(firebaseConfig);
  
const auth = getAuth(app);
  
const provider = new GoogleAuthProvider();

/// we should verify that username is the same
/// we should check if the uid in local storage muches with the uid of that username
/// in that database there is yassin with => uid + username
/// in the local storage there is yassin with => uid + username
/// when user sends something we should verify if 
/// localStorage(yassin) == yassin.username and localStorage(uid) == yassin.uid


const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {

        setDisplayName(result.user.displayName)
        setEmail(result.user.email)
        setPhotoURL(result.user.photoURL)
        setUid(result.user.uid)

        localStorage.setItem("this_uid", result.user.uid)
    })
      .catch((error) => {
        console.log(error);
    });
  };
const logout = async () => {
    await signOut(auth);
}
return (
    <authContext.Provider value={{email, displayName, uid, photoURL, auth, signInWithGoogle, logout, signOut}}>
        {children}
    </authContext.Provider>
)
}

export {AuthContextProvider, authContext}