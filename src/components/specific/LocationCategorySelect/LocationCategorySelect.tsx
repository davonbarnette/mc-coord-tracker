import React from 'react';
import {Select} from 'antd';

import './style.scss';
import {StringUtils} from "../../../global/utils/string";
import {ELocationCategory} from "../LocationForm/Types";


const {Option} = Select;

export interface Props {
    onChange?: (selectedControls: number[]) => void,
    defaultValue?:ELocationCategory,
    loading?:boolean,
    value?:ELocationCategory
}

function LocationCategorySelect(props:Props){
    const {onChange, defaultValue, loading, value} = props;

    return (
        <div className='world-select'>
            <Select className='world-select-search' size='large' placeholder='Choose Category' loading={loading} allowClear
                    optionLabelProp='children' onChange={onChange} defaultValue={defaultValue} showArrow={false} value={value}>
                {Object.keys(ELocationCategory).map(key => (
                    <Option value={ELocationCategory[key]} key={ELocationCategory[key]}>
                        {StringUtils.camelCaseToRegular(ELocationCategory[key], false, true)}
                    </Option>
                ))}
            </Select>
        </div>
    )
}
export default LocationCategorySelect;