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
    static async getCoordinateById(id){
        try{
            let res = await axios.get(`/minecraft-coordinates/${id}`);
            if (res.data){
                return res.data as IMinecraftCoordinate;
            }
        } catch (e){
            console.error('Could not get minecraft coordinates');
        }
    }

    static async deleteCoordinate(id){
        try{
            let res = await axios.delete(`/minecraft-coordinates/${id}`);
            if (res.data){
                return res.data as IMinecraftCoordinate;
            }
        } catch (e){
            console.error('Could not get minecraft coordinates');
        }
    }

    static async createCoordinates(values:any){
        try{
            let res = await axios.post('/minecraft-coordinates', values);
            if (res.data){
                return res.data as IMinecraftCoordinate;
            }
        } catch (e){
            console.error('Could not get minecraft coordinates');
        }
    }

}