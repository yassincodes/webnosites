import {Link, Flex, Center, Spacer, toast} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

function Copy() {

    function copyText() {
        navigator.clipboard.writeText("localhost:3000/" + "appData[0].username")
        toast({
          title: 'Link copied to clipboard',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
    }

    return (
    <Flex style={{background:"#F8F8F8", right:"0", height:"6vh", borderBottom:"1px solid black"}}>
       <Center style={{marginLeft:"1vw"}}><strong style={{marginLeft:"0.5vw"}}>link:</strong> <Link>{"localhost:3000/" + "appData[0].username"}</Link></Center>
       <Spacer />
       <Center
           onClick={copyText} 
           style={{marginRight:"0.5vw", cursor:"pointer"}}>copy<CopyIcon />
       </Center>
    </Flex>
    )
}

export default Copy