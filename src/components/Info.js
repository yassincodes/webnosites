import { Link } from "react-router-dom"
import { Heading, Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, 
         PopoverCloseButton, PopoverBody, Button } from '@chakra-ui/react'
import {useWindowWidth} from '@react-hook/window-size'
function Info({data}) {
    const width = useWindowWidth()
    return (
        <div style={width > 980 ? {height: "100vh", display:"flex", flexDirection:"column", justifyContent:"space-between", borderRight:"1px solid black", position:"fixed", left:"0", width:"6%"} : {display:"flex", justifyContent:"space-between", borderBottom:"1px solid black"}}>

            <div style={{textAlign:"center", display:"flex",alignItems:"center",justifyContent:"center", height:"6vh"}}>
            <Heading style={{color: "orange",fontFamily: "'Niconne', cursive"}} >R</Heading>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Popover placement="bottom">
                <PopoverTrigger>
                    <img style={{marginTop:"0.2vh", marginBottom:"0.2vh"}} size={width > 980 ? "md" : "sm"} name='' src={data && data[0].photoURL} />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverHeader>@{data && data[0].username}</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                         <Link to="/">
                            <Button colorScheme='red'>logout</Button>
                         </Link>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
            </div>
        </div>
    )
}

export default Info