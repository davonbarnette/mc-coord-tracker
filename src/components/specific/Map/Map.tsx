import React, {useEffect, useState} from "react";
import cx from 'classnames';

import './styles.scss';

import {ScatterChart} from 'react-chartkick';
import {EWorlds, IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import {StringUtils} from "../../../global/utils/string";
import WorldIcon from "../WorldIcon/WorldIcon";

function Map() {
    const [coordinates, setCoordinates] = useState<IMinecraftCoordinate[]>([]);
    const [world, setWorld] = useState<EWorlds>(EWorlds.Overworld);

    async function getCoordinates(params?: any) {
        let coordinates = await CoordinatesAPI.getAllCoordinates(params);
        if (coordinates) {
            setCoordinates(coordinates);
        }
    }

    useEffect(() => {
        getCoordinates({world});
    }, [])

    let coordsParsed = [];
    let labels = [];

    let data = []

    coordinates.forEach(coord => {
        coordsParsed.push({x: coord.x, y: coord.z});
        labels.push(coord.name);

        data.push([coord.x, coord.z])
    })

    function onWorldChange(world) {
        getCoordinates({world});
    }


    return (
        <div className='coordinate-map'>
            <div className='worlds'>
                {Object.keys(EWorlds).map(key => {
                    let curWorld = EWorlds[key]
                    return (
                        <div key={curWorld} className={cx('world', {selected: world === curWorld})}
                             onClick={() => onWorldChange(curWorld)}>
                            <WorldIcon world={curWorld} style={{width: 20, marginRight: 9}}/>
                            {StringUtils.camelCaseToRegular(curWorld, false, true)}
                        </div>
                    )
                })}
            </div>
            <ScatterChart data={data}/>
        </div>
    )
}

export default Map;