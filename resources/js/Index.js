import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from "./components/forms/login";
import Register from "./components/forms/register";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import NotFound from "./views/notFound";
import Navbar from "./components/navigation/navBar";
import Requests from "./views/requests";
import Employees from "./views/employees";
import Employee from "./views/employee";
import AllRequests from "./views/AllRequests";

function App() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route index element={user ? <Requests/> : <Navigate to="/login"/>}/>
                    <Route path="/dashboard" element={user ? <Requests/> : <Navigate to="/login"/>}/>
                    <Route path="/dashboard/:slug" element={user ? <AllRequests/> : <Navigate to="/login"/>}/>
                    <Route path="/employees" element={user ? <Employees/> : <Navigate to="/login"/>}/>
                    <Route path="/employees/:id" element={user ? <Employee/> : <Navigate to="/login"/>}/>
                    <Route path='*' exact={true} element={<NotFound/>}/>
                    {/*Protected Routes*/}
                    {/*Protected Routes*/}
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
            <ToastContainer/>
        </div>
    );
}

export default App;

