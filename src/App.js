import './App.css';
import React from 'react';
import router from './routing';
import { RouterProvider } from "react-router-dom";


function App() {
  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <RouterProvider router={router} />
    </>
  );
}

export default App;
