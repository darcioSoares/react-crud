import React from 'react'
import {BroserRouter, Switch, Router} from 'react-router-dom'

import Home from './Components/home/Home'
import UserCrud from './Components/User/UserCrud'

export default props => 
    <BroserRouter>
        <Switch>
            <Router exact path="/" component={Home} />
            <Router path="/user" component={UserCrud} exact />            
        </Switch>
    </BroserRouter>