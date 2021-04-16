import React, {useEffect, useState} from 'react';
import {Input} from 'antd';
import './styles.scss';

import _ from "lodash";
import {EnvironmentOutlined, LoadingOutlined} from "@ant-design/icons";
import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import {StringUtils} from "../../../global/utils/string";
import WorldIcon from "../WorldIcon/WorldIcon";
import XYZList from "../XYZList/XYZList";

interface Props {
    onChange?: (id: number, coordinate: IMinecraftCoordinate) => void,
    loading?: boolean,
    option?: number
    disabled?: boolean,
    placeholder?: string,
    value?: number,
    maximum?: number
}

function CoordinateSelectAsInput(props: Props) {
    const {onChange, placeholder, maximum} = props;
    const [coordinates, setCoordinates] = useState<IMinecraftCoordinate[]>([]);
    const [loading, setLoading] = useState(false);

    async function getCoordinates(params?: any) {
        setLoading(true);
        let coordinates = await CoordinatesAPI.getAllCoordinates(params)
        if (coordinates) setCoordinates(coordinates);
        setLoading(false);
    }

    async function onSearch(value: string) {
        if (!value) {
            await getCoordinates({_limit: 4});
        } else {
            await getCoordinates({name_contains: value});
        }
    }

    const debouncedSearch = _.debounce(onSearch, 300);

    useEffect(() => {
        getCoordinates({_limit: 4});
    }, [])

    function onCoordinateClick(id: number) {
        let filtered = coordinates.filter(coord => coord.id === id);
        if (filtered.length === 1) {
            if (onChange) onChange(id, filtered[0]);
        }
    }

    function getCoordinatesByWorld() {
        let ret = {};
        coordinates.forEach(coord => {
            const {world} = coord;
            if (!ret[world]) {
                ret[world] = [];
            }
            ret[world].push(coord);
        })
        return ret;
    }

    function renderContent() {

        if (loading) {
            return <LoadingOutlined spin/>
        }
        if (props.value) {

        } else {
            return Object.keys(getCoordinatesByWorld()).map(world => {
                const coordinates = getCoordinatesByWorld()[world];
                return (
                    <div className='world-group' key={world}>
                        <div className='world'>
                            <WorldIcon world={world} style={{width: 24, marginRight: 6}}/>
                            The {StringUtils.camelCaseToRegular(world, true)}
                        </div>
                        <div className='coordinate-results'>
                            {coordinates.map(coord => {
                                const {id, name, x, y, z} = coord;
                                return (
                                    <div key={id} className='coordinate-result' onClick={() => onCoordinateClick(id)}>
                                        <EnvironmentOutlined style={{fontSize: 16}}/>
                                        <div className='info'>
                                            <div className='name'>{name}</div>
                                            <XYZList coordinate={coord}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })
        }
    }

    function renderInput() {
        if (!props.value) {
            return <Input size='large' onChange={e => debouncedSearch(e.target.value)} placeholder={placeholder}/>
        } else {
            let filtered = coordinates.filter(coord => coord.id === props.value);
            if (filtered.length === 1) {
                const coord = filtered[0]
                const {name, x, y, z} = coord;
                return (
                    <div className='coordinate-result selected'>
                        <EnvironmentOutlined style={{fontSize: 16}}/>
                        <div className='info'>
                            <div className='name'>{name}</div>
                            <div className='coordinates'>
                                <div className='x'>{x}</div>
                                <div className='y'>{y || 'None'}</div>
                                <div className='z'>{z}</div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return null;
            }
        }
    }


    return (
        <div className='coordinates-select-as-input'>
            {renderInput()}
            {renderContent()}
        </div>
    )
}

export default CoordinateSelectAsInput;