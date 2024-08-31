import React from "react";
import {NavBar} from "../components";
import {Home, PhotoGallery} from "../pages";
import {hydrateRoot} from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const photosString = window.__PRELOADED_STATE__;

const rootElement = document.getElementById('app');
hydrateRoot(rootElement, (
    <Router basename="/test">
        <NavBar/>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/" element={<PhotoGallery photos={photosString}/>}/>
        </Routes>
    </Router>
));
