import React, {Component} from 'react';
import {Redirect, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout} from "antd";

import './styles.scss';

/* App Imports */
import HAppHeader from "./AppHeader/HAppHeader";
import {AppRoutesRenders} from "./RoutesRegister";
import {BrowserRoutes} from "../../stores/App/BrowserRouter";

class App extends Component<RouteComponentProps, any> {

    render() {
        return (
            <Layout className='app' id='app' style={{height:'100vh'}}>
                <HAppHeader/>
                <Switch>
                    {AppRoutesRenders}
                    <Redirect to={BrowserRoutes.home}/>
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(observer(App));
