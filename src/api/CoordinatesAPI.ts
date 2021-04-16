import axios from "axios";
import {IMinecraftCoordinate} from "./CoordinatesTypes";

export default class CoordinatesAPI {

    static async getAllCoordinates(params?:any){
        try{
            let res = await axios.get('/minecraft-coordinates', {params});
            if (res.data){
                return res.data as IMinecraftCoordinate[];
            }
        } catch (e){
            console.error('Could not get minecraft coordinates');
        }
    }

}