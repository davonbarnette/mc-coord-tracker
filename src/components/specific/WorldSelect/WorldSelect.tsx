import React from 'react';
import {Select} from 'antd';

import './style.scss';
import {StringUtils} from "../../../global/utils/string";
import {EWorlds} from "../../../api/CoordinatesTypes";


const {Option} = Select;

export interface Props {
    onChange?: (selectedControls: number[]) => void,
    defaultValue?:EWorlds,
    loading?:boolean,
}

function WorldSelect(props:Props){
    const {onChange, defaultValue, loading} = props;

    return (
        <div className='world-select'>
            <Select className='world-select-search' size='large' placeholder='Choose World' loading={loading} allowClear
                    optionLabelProp='children' onChange={onChange} defaultValue={defaultValue} showArrow={false}>
                {Object.keys(EWorlds).map(key => (
                    <Option value={EWorlds[key]} key={EWorlds[key]}>
                        {StringUtils.camelCaseToRegular(EWorlds[key], false, true)}
                    </Option>
                ))}
            </Select>
        </div>
    )
}
export default WorldSelect;