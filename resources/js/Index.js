import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from "./components/forms/login";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/navigation/navBar";
import Api from "./api/api";
import {useStateValue} from "./states/StateProvider";
import {AdminRouter} from "./router/router";
import Settings from "./views/settings";

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
                    <Route index element={user ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>}/>
                    <Route path="/settings" element={user ? <Settings settings={settings}/> : <Navigate to="/login"/>}/>
                    {
                        AdminRouter.map(route => (
                            <Route key={route.id} path={route.path}
                                   element={user ? route.component : <Navigate to="/login"/>}/>
                        ))
                    }
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/dashboard"/>}/>
                </Routes>
            </Router>
            <ToastContainer style={{zIndex: '99999999999'}}/>
        </div>
    );
}

export default App;

