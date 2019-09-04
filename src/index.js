import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { mainRoutes } from './routes'

import './index.less'
import { from } from 'rxjs';

render (
    <Router>
        <Switch>
            <Route path="/admin" render={(routerProps) => {
                // TODO: 权限，需要登陆才能够访问 /admin
                return <App {...routerProps}/>
            }} />
            {
                mainRoutes.map(route => {
                    return <Route key={route.pathname} path={route.pathname} component={route.component} />
                })
            }
            <Redirect to="/admin" from="/" exact />
            <Redirect to="/404" />
        </Switch>
    </Router>,
    document.querySelector('#root')
)