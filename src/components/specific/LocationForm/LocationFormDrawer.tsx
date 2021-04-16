import React, {useState} from 'react';
import {Drawer} from "antd";
import {PlusCircleOutlined} from '@ant-design/icons';

import './styles.scss';
import Button from "../../common/Button/Button";
import LocationForm from "./LocationForm";
import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";

interface Props {
    className?: string,
    onSubmit?: (values: string) => void,
    asButton?: boolean,
    coordinate?:IMinecraftCoordinate
}

function LocationFormDrawer(props: Props) {
    const {className, onSubmit, asButton, coordinate} = props;
    const [showForm, setShowForm] = useState(!asButton);

    const onButtonClick = async (e: any) => {
        e.stopPropagation();
        setShowForm(true);
    }

    const onFormSubmit = async (values: any) => {
        if (onSubmit) onSubmit(values);
        setShowForm(false);
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            {asButton &&
            <Button icon={<PlusCircleOutlined/>} className={className} onClick={onButtonClick}>
                Add Location
            </Button>}
            <Drawer title='Add Location' width='50%' keyboard={false} visible={showForm}
                    destroyOnClose onClose={() => setShowForm(false)}
                    footer={null} className='location-form-drawer'>
                <LocationForm onSubmit={onFormSubmit} footerStickied applyDrawerStyles coordinate={coordinate}/>
            </Drawer>
        </div>
    )
}

export default LocationFormDrawer;