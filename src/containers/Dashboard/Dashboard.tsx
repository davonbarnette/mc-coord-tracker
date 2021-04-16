import React from 'react';

import './styles.scss';
import CoordinatesTable from "../../components/specific/CoordinatesTable/CoordinatesTable";
import Directions from "../../components/specific/Directions/Directions";

export default () => {
    return (
        <div className='dashboard'>

            <div className='left'>
                <Directions/>
            </div>

            <CoordinatesTable/>
        </div>
    )
}