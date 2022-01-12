import firebase from "firebase/compat/app";
import "firebase/compat/database"

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

export default firebase