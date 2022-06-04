import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Redirect, Route, Routes} from 'react-router-dom';
import Login from "./components/forms/login";
import Register from "./components/forms/register";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import NotFound from "./views/notFound";
import Navbar from "./components/navBar";
import Home from "./views/home";

function App() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="App">
        <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={user? <Home/> : <Navigate to="/login"/>}/>
                    <Route path='*' exact={true} element={<NotFound/>}/>
                    {/*Protected Routes*/}
                    {/*Protected Routes*/}
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/login" element={!user? <Login/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
            <ToastContainer/>
        </div>
    );
}

export default App;

