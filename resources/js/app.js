import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reducer, {initialState} from "./states/reducer";
import {StateProvider} from './states/StateProvider';
import Index from "./Index";
require('./bootstrap');

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <Index/>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('app')
);
