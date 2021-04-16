import React, {useEffect, useState} from 'react';
import {Select} from 'antd';

import './styles.scss';

import _ from "lodash";
import {LoadingOutlined} from "@ant-design/icons";
import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import CoordinatesAPI from "../../../api/CoordinatesAPI";

const {Option} = Select;

interface Props {
    onChange?: (type: string) => void,
    loading?: boolean,
    className?: string,
    option?: number
    disabled?: boolean,
}

function CoordinateSelect(props: Props) {
    const {className, onChange, loading, option} = props;
    const [coordinates, setCoordinates] = useState<IMinecraftCoordinate[]>();

    async function getCoordinates(params?: any) {
        let coordinates = await CoordinatesAPI.getAllCoordinates(params)
        if (coordinates) setCoordinates(coordinates);
    }

    async function onSearch(value: string) {
        if (!value) {
            return null;
        }
        await getCoordinates({name_contains: value});
    }

    const debouncedSearch = _.debounce(onSearch, 300);

    useEffect(() => {
        getCoordinates();
    }, [])

    return (
        <Select className='coordinates-select' size='large' optionLabelProp='children' onSearch={debouncedSearch}
                placeholder='Search Coordinates'
                defaultValue={option} onSelect={onChange as any} loading={loading} showSearch filterOption={false}
                notFoundContent={loading ? <LoadingOutlined spin/> : null} allowClear showArrow={false}>
            {coordinates && coordinates.map(coordinate =>
                <Option value={coordinate.id} key={coordinate.id}>
                    {coordinate.name}
                </Option>
            )}
        </Select>
    )
}

export default CoordinateSelect;