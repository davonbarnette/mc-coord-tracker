import React, {ImgHTMLAttributes} from 'react'
import {EWorlds} from "../../../api/CoordinatesTypes";
import Dirt from '../../../assets/icons/Dirt.png';
import EndStone from '../../../assets/icons/EndStone.png';
import NetherRack from '../../../assets/icons/NetherRack.png';


interface Props extends ImgHTMLAttributes<any> {
    world:EWorlds,
}

function WorldIcon(props:Props){
    let icon = Dirt;

    switch(props.world){
        case EWorlds.Overworld:
            icon = Dirt;
            break;
        case EWorlds.End:
            icon = EndStone;
            break;
        case EWorlds.Nether:
            icon = NetherRack;
            break;
    }

    return <img {...props} src={icon} alt="world"/>
}

export default WorldIcon;