import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Logo from "../../../assets/logo.png";
import './styles.scss';

import {Layout} from "antd";
import LoginForm from "./Login/LoginForm";
import BrowserRouter, { BrowserRoutes } from '../../../stores/App/BrowserRouter';
import RegisterForm from './Register/RegisterForm';
import ResetPassword from "./ResetPassword/ResetPassword";
import ResetPasswordRequest from "./ResetPassword/ResetPasswordRequest";

const {Content} = Layout;

interface Props {

}

interface State {
}

class Auth extends Component<Props, State> {

    state: State = {};

    render() {
        return (
            <Layout style={{background: '#f9fafc'}}>
                <Content className='auth-showing'>
                    <section className='auth-page'>
                        <div className='content'>
                            <div className='right'>
                                <div className='title' onClick={()=>BrowserRouter.push(BrowserRoutes.login)}>
                                    <div className='subtitle'><img alt="Logo" src={Logo}/>
                                    CORL Technologies</div>
                                    User Portal
                                </div>
                                <Switch>
                                    <Route exact path={BrowserRoutes.login} component={LoginForm}/>
                                    <Route exact path={BrowserRoutes.signup} component={RegisterForm}/>
                                    <Route exact path={BrowserRoutes.requestPasswordReset} component={ResetPasswordRequest}/>
                                    <Route exact path={BrowserRoutes.passwordReset} component={ResetPassword}/>
                                    <Redirect to={BrowserRoutes.login}/>
                                </Switch>
                            </div>
                        </div>
                    </section>
                </Content>
            </Layout>
        )
    }
}

export default observer(Auth);