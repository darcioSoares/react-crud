import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import {BrowserRouter} from 'react-router-dom'
// HashRouter add um # na url / BrowserRouter pode vim a ter problemas


import Logo from '../Components/Templates/Logo'
import Nav from '../Components/Templates/Nav'
//import Home from '../Components/home/Home'
import Footer from '../Components/Templates/Footer'
import Routes from '../router'

import User from '../Components/User/UserCrud'

export default props => 
        <BrowserRouter>
            <div className="app">
                <Logo />
                <Nav />
                <User />               
                <Footer />
            </div>
        </BrowserRouter> 