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

    currentCoordinates = [];
    
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
    currentCoordinates:observable,
});


const AppStore = new AppStoreClass();
export default AppStore;