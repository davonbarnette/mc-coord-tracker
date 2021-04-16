import React from 'react';
import { ScatterChart } from 'react-chartkick';
import 'chartkick/chart.js'

import './styles.scss';
import CoordinatesTable from "../../components/specific/CoordinatesTable/CoordinatesTable";
import Directions from "../../components/specific/Directions/Directions";
import {observer} from "mobx-react";
import AppStore from "../../stores/App/AppStore";

function Dashboard() {

    function getCoordinates(){
        return AppStore.currentCoordinates.map(coord => ([coord.x, coord.z]))
    }

    return (
        <div className='dashboard'>
            <div className='left'>
                <div className='directions-wrapper'>
                    <Directions/>
                </div>
                <ScatterChart data={getCoordinates()}/>
            </div>
            <div className='right'>
                <div className='coordinates-table-wrapper'>
                    <CoordinatesTable/>
                </div>
            </div>
        </div>
    )
}

export default observer(Dashboard);