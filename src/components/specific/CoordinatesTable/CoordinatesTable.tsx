import React, {useEffect, useState} from 'react';
import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import {Table} from "antd";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import CoordinatesTableConfig from "./CoordinatesTableConfig";

function CoordinatesTable(){
    const [coords, setCoords] = useState<IMinecraftCoordinate[]>();

    async function getCoordinates(){
        let coordinates = await CoordinatesAPI.getAllCoordinates();
        if (coordinates) setCoords(coordinates);
    }

    useEffect(()=> {
        getCoordinates();
    },[])

    return (
        <div className='coordinates-list'>
            <Table dataSource={coords} columns={CoordinatesTableConfig}/>
        </div>
    )
}

export default CoordinatesTable;