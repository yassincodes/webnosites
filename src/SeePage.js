import React from 'react'
import {Button, Center, Drawer, DrawerOverlay, 
        DrawerContent, DrawerBody, DrawerFooter, 
        useDisclosure} from '@chakra-ui/react'
import {ViewIcon} from '@chakra-ui/icons'
import "./SeePage.css"

function SeePage({data, theData }) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          see page <ViewIcon />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='bottom'
          size="full"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody> 
            <div className="see_page" style={(theData && theData.length < 8) ? {height:"100vh", marginTop:"3vh"} : {height:"auto", paddingBottom:"5vh", marginTop:"3vh"}}>
              <Center className="see_page_header">
               <img name='' style={{borderRadius:"50%", marginBottom:"1.5vh"}} src={data && data[0].photoURL} />
               {data && data[0].displayName}
              </Center>
              {data && data.map((resolution) => {
                      return <div className="see_page_resolution" style={resolution.text ? {margin:"1.5vh 6vw", padding:"1.5vh 3vw", background:"lightblue", borderRadius:"10px", color:"black"} : {color:"black"}}>
                        {resolution.text}
                      </div>})}            
            </div> 
            </DrawerBody>
            <Center>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose} colorScheme='blue'>
                close
              </Button>
            </DrawerFooter>
            </Center>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default SeePage