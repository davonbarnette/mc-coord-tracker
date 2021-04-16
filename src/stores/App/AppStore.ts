import {decorate, observable, computed} from "mobx";
import {TUser} from "./Types";
import axios from "axios";
axios.defaults.baseURL = 'https://api.davon.dev';

class AppStoreClass {

    initialized:    boolean = false;
    user?:          TUser;
    authToken?:     string;
    authTokenChecked:boolean = false;
    baseUrl = 'https://api.davon.dev';
    
    init(){

    }


    get necessaryDataIsLoaded(){
        return true;
    }
}


decorate(AppStoreClass, {
    authToken:      observable,
    authTokenChecked:observable,
    user:           observable,
    necessaryDataIsLoaded: computed,
});


const AppStore = new AppStoreClass();
export default AppStore;