import React from "react";

import './styles.scss';

import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";

interface Props {
    coordinate: IMinecraftCoordinate,
}

function XYZList(props: Props) {
    const {x, y, z} = props.coordinate;

    return (
        <div className='coordinates'>
            <div className='x'>{x}</div>
            <div className='y'>{y || 'None'}</div>
            <div className='z'>{z}</div>
        </div>
    )
}

export default XYZList;