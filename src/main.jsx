import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import * as React from "react";
// import * as ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//     <App/>
//   </React.StrictMode>
// );