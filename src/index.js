import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./contexts/authContext";
import { WidthContextProvider } from "./contexts/widthContext";
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <AuthContextProvider>
        <ChakraProvider>
        <WidthContextProvider>
          <App />
        </WidthContextProvider>
        </ChakraProvider>
        </AuthContextProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

