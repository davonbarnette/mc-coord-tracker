import React, {useEffect, useState} from 'react';
import qs from 'qs';

import './styles.scss';

import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import {Col, Form, Input, Row, Table} from "antd";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import CoordinatesTableConfig from "./CoordinatesTableConfig";
import LocationFormDrawer from "../LocationForm/LocationFormDrawer";
import WorldSelect from "../WorldSelect/WorldSelect";
import _ from "lodash";
import axios from "axios";
import AppStore from "../../../stores/App/AppStore";

function CoordinatesTable() {
    const [coords, setCoords] = useState<IMinecraftCoordinate[]>();

    async function getCoordinates(params?:any) {
        let coordinates = await CoordinatesAPI.getAllCoordinates(params);
        if (coordinates) {
            setCoords(coordinates);
            AppStore.currentCoordinates = coordinates;
        }
    }

    useEffect(() => {
        getCoordinates();
    }, [])

    async function onSearch(changedValues, allValues) {
        let _where = [];

        if (allValues.world){
            _where.push({world: allValues.world}) ;
        }
        if (allValues.name){
            _where.push({ name_contains:allValues.name })
        }

        let coords = await getCoordinatesWithQuery(qs.stringify({_where}));
        if (coords) {
            setCoords(coords);
            AppStore.currentCoordinates = coords;
        }

    }

    async function getCoordinatesWithQuery(query){
        try{
            let res = await axios.get(`/minecraft-coordinates?${query}`);
            if (res.data) return res.data as IMinecraftCoordinate[];
        } catch (e) {
            return undefined;
        }
    }

    const debouncedSearch = _.debounce(onSearch, 300);

    return (
        <div className='coordinates-table'>
            <div className='header'>
                <div className='title'>
                    Locations
                </div>
                <LocationFormDrawer asButton onSubmit={() => getCoordinates()}/>
            </div>
            <div className='filters'>
                <Form layout='vertical' onValuesChange={debouncedSearch}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='Name' name='name' style={{marginBottom: 0}}>
                                <Input size='large' placeholder='Search by name'/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='World' name='world' style={{marginBottom: 0}}>
                                <WorldSelect/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table rowKey='id' dataSource={coords} columns={CoordinatesTableConfig} pagination={{size: 'small'}}/>
        </div>
    )
}

export default CoordinatesTable;