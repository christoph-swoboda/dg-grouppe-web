import './App.css';
import React, {useEffect, useState} from "react";
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
import AllRequests from "./views/allRequests";
import Settings from "./views/settings";
import Api from "./api/api";
import {useStateValue} from "./states/StateProvider";
import AddBulkEmployee from "./components/forms/addBulkEmployee";

function App() {

    const [{loadSettings}] = useStateValue()
    const [settings, setSettings] = useState([])
    useEffect(async () => {
        await Api().get('settings').then(res => {
            setSettings(res.data)
        })
    }, [loadSettings]);

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route index element={user ? <Requests/> : <Navigate to="/login"/>}/>
                    <Route path="/dashboard" element={user ? <Requests/> : <Navigate to="/login"/>}/>
                    <Route path="/settings" element={user ? <Settings settings={settings}/> : <Navigate to="/login"/>}/>
                    <Route path="/dashboard/:slug" element={user ? <AllRequests/> : <Navigate to="/login"/>}/>
                    <Route path="/employees" element={user ? <Employees/> : <Navigate to="/login"/>}/>
                    <Route path="/employees/add-bulk" element={user ? <AddBulkEmployee/> : <Navigate to="/login"/>}/>
                    <Route path="/employees/:id" element={user ? <Employee/> : <Navigate to="/login"/>}/>
                    <Route path='*' exact={true} element={<NotFound/>}/>
                    {/*Protected Routes*/}
                    {/*Protected Routes*/}
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
            <ToastContainer style={{zIndex:'99999999999'}}/>
        </div>
    );
}

export default App;

