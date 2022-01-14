import React, {useContext} from 'react'
import {windowNumberContext} from "../contexts/windowNumberContext"

function Navigation() {
    const {windowNumber, setWindowNumber} = useContext(windowNumberContext)
    return (
        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center",width:"100%", height:"6.6vh", background:"white", borderBottom:"1px solid black", marginBottom:"1.5em",background:"#F8F8F8"}}>

            <div>
                <p style={windowNumber == 1 ? {cursor:"pointer", color:"black", fontWeight:"bold"} : {cursor:"pointer", color:"gray"}} onClick={() => setWindowNumber(1)}>Resolutions</p>
            </div>

            <div>
                <p style={windowNumber == 2 ? {cursor:"pointer", color:"black", fontWeight:"bold"} : {cursor:"pointer", color:"gray"}} onClick={() => setWindowNumber(2)}>Appearance</p>
            </div>

            <div>
                <p style={windowNumber == 3 ? {cursor:"pointer", color:"black", fontWeight:"bold"} : {cursor:"pointer", color:"gray"}} onClick={() => setWindowNumber(3)}>Analytics</p>
             </div>


        </div>
    )
}

export default Navigation