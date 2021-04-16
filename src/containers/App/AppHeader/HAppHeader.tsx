import cx from 'classnames';
import React, {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Layout, Avatar, Dropdown, Menu} from 'antd';
import {RocketOutlined, CaretDownOutlined, LogoutOutlined, TeamOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";

import './styles.scss';

import { AppRoutesPathReference, AppHeaderItemsMap } from '../RoutesRegister';
import BrowserRouter, { BrowserRoutes } from '../../../stores/App/BrowserRouter';
// import Logo from "../../../../assets/logo.png";
import AppActions from "../../../stores/App/AppActions";
import AppStore from "../../../stores/App/AppStore";


const {Header} = Layout;

interface Props extends RouteComponentProps {

}

interface State {
    collapsed:boolean,
    showMobileMenu:boolean,
}

class AppHeader extends Component<Props, any> {

    state:State = {
      collapsed:false,
        showMobileMenu:false,
    };

    get selectedKey() {
        for (let key in AppRoutesPathReference){
            if(this.props.location.pathname.includes(AppRoutesPathReference[key].path)) {
                return key;
            }
        }

        return '';
    }
    get menuItems(){
        return AppHeaderItemsMap.map(appRouteHeader => {
            const {key, icon, path} = appRouteHeader;
            return(
                <div key={key} onClick={()=>BrowserRouter.push(path)} className={cx('single-menu-item', {selected: key === this.selectedKey})}>
                    {icon}
                    <span>{key}</span>
                </div>
            )
        })
    }
    get menu(){
        return (
            <Menu className='ant-custom-menu-override'>
                <Menu.Item className='single-action' onClick={AppActions.logout}>
                    <LogoutOutlined/>
                    <div className='right'>
                        <div className='title'>Logout</div>
                    </div>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <Header className='app-header'>
                <div className='content'>
                    <div className='app-header-left'>
                        <div className='logo' onClick={() => BrowserRouter.push(BrowserRoutes.home)}>
                            {/*<img alt="Logo" src={Logo}/>*/}
                            <div className='logo-text'>
                                <div className='logo-text-bottom'>Minecraft Coordinates</div>
                            </div>
                        </div>
                    </div>
                    <div className='full-width-menu'>
                        {this.menuItems}
                    </div>

                    <div className='app-header-right'>
                        <Dropdown overlay={this.menu} trigger={['click']}>
                            <div className='user-container'>
                            <Avatar style={{backgroundColor: '#16c784'}} icon={<RocketOutlined/>}/>
                            <div className='user'>
                                <div className='name'>{AppStore.user?.firstName} {AppStore.user?.lastName}</div>
                                <div className='email'>{AppStore.user?.email}</div>
                            </div>
                            <CaretDownOutlined style={{color:'white'}}/>
                        </div>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(observer(AppHeader));
