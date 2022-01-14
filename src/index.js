import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./contexts/authContext";
import { WindowNumberContextProvider } from "./contexts/windowNumberContext";
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <AuthContextProvider>
        <ChakraProvider>
        <WindowNumberContextProvider>
          <App />
        </WindowNumberContextProvider>
        </ChakraProvider>
        </AuthContextProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

