import {MinecraftPoint} from "../global/utils/Minecraft";

export interface IMinecraftCoordinate extends MinecraftPoint{
    id:number,
    name:string,
    owner:string,
    description:string,
    world:EWorlds,
}

export enum EWorlds {
    Overworld = 'overworld',
    Nether = 'nether',
    End = 'end',
}