import React, {useState} from "react"

const windowNumberContext = React.createContext()

function WindowNumberContextProvider({children}) {

const [windowNumber, setWindowNumber] = useState(1)

return (
    <windowNumberContext.Provider value={{windowNumber, setWindowNumber}}>
        {children}
    </windowNumberContext.Provider>
)
}

export {WindowNumberContextProvider, windowNumberContext}
