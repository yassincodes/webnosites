import React, {useState, useEffect} from "react"

const widthContext = React.createContext()

function WidthContextProvider({children}) {
    const [windowNumber, setWindowNumber] = useState(1)
    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

return (
    <widthContext.Provider value={{ width, windowNumber, setWindowNumber }}>
        {children}
    </widthContext.Provider>
)
}

export {WidthContextProvider, widthContext}