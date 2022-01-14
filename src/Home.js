// NOTE: for the program to work at first,
// you should add push a username to the database

import React, { useState, useRef, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { authContext } from "./contexts/authContext"
import { Link } from "react-router-dom"
import "./Home.css"
function Home() {
    const { signInWithGoogle } = useContext(authContext)


    const [active, setActive] = useState(false);
    const contentRef = useRef(null);
    useEffect(() => {
      contentRef.current.style.maxHeight = active
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }, [contentRef, active]);
    const toggleAccordion = () => {
      setActive(!active);
    };
    

    const [active2, setActive2] = useState(false);
    const contentRef2 = useRef(null);
    useEffect(() => {
      contentRef2.current.style.maxHeight = active2
        ? `${contentRef2.current.scrollHeight}px`
        : "0px";
    }, [contentRef2, active2]);
    const toggleAccordion2 = () => {
      setActive2(!active2);
    };


    const [active3, setActive3] = useState(false);
    const contentRef3 = useRef(null);
    useEffect(() => {
      contentRef3.current.style.maxHeight = active3
        ? `${contentRef3.current.scrollHeight}px`
        : "0px";
    }, [contentRef3, active3]);
    const toggleAccordion3 = () => {
      setActive3(!active3);
    };


    return (
        <div className="home_page">
          <h1 className="home_page_header" >webnosties</h1>
          {
            // Question 1 //
          }
            <button
              className={`question-section ${active}`}
              onClick={toggleAccordion}

            >
             <div>
              <div className="question-align">
                <h4 className="question-style">
                  what is the concept of a webnosite 
                </h4>
                <FiPlus
                  className={active ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div
                ref={contentRef}
                className={active ? `answer answer-divider` : `answer`}
              >
                <p>here things </p>
              </div>
             </div>
            </button>
            {
              // Question 2 //
            }
            <button
              className={`question-section ${active}`}
              onClick={toggleAccordion2}
            >
             <div>
              <div className="question-align">
                <h4 className="question-style">
                  what is the concept of a webnosite 
                </h4>
                <FiPlus
                  className={active2 ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div
                ref={contentRef2}
                className={active2 ? `answer answer-divider` : `answer`}
              >
                <p>Because I love coding</p>
              </div>
             </div>
            </button>
            {
              // Question 3 //
            }
                        <button
              className={`question-section ${active}`}
              onClick={toggleAccordion3}
            >
             <div>
              <div className="question-align">
                <h4 className="question-style">
                  how a website works in action
                </h4>
                <FiPlus
                  className={active3 ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div
                ref={contentRef3}
                className={active3 ? `answer answer-divider` : `answer`}
              >
                <p>wanna see how a website could work in action</p>
                <p>you can do that by clickin on the button below</p>
                <Link to="/admin" onClick={signInWithGoogle} className="login-with-google-btn">Continue with google</Link>
              </div>
             </div>
            </button>    
        </div>
    )
}

export default Home