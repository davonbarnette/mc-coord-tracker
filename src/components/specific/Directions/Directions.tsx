import React, {useState} from 'react';
import {SyncOutlined} from '@ant-design/icons';
import cx from 'classnames';

import './styles.scss';

import {Form} from "antd";
import CoordinateSelectAsInput from "../CoordinatesSelectAsInput/CoordinatesSelectAsInput";
import Button from "../../common/Button/Button";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import MinecraftUtils from "../../../global/utils/Minecraft";
import NumbersUtil from "../../../global/utils/number";
import {StringUtils} from "../../../global/utils/string";

function Directions() {
    const [form] = Form.useForm();
    const [valuesForm, setValuesForm] = useState({});
    const [coordDistance, setCoordDistance] = useState<number>();
    const [calculatingDistance, setCalculatingDistance] = useState(false);
    const [stateDestination, setStateDestination] = useState();
    const [stateFrom, setStateFrom] = useState();

    function onValuesChange(v) {
        console.log('v', v);
        if (v.from) setStateFrom(v.from);
        if (v.destination) setStateDestination(v.destination);
        setValuesForm(v || {});
        calculateCoordinateDistance();
    }

    async function calculateCoordinateDistance() {
        setCalculatingDistance(true);
        let destinationId = form.getFieldValue('destination');
        let fromId = form.getFieldValue('from');
        let destination = await CoordinatesAPI.getCoordinateById(destinationId);
        let from = await CoordinatesAPI.getCoordinateById(fromId);

        if (from && destination) {
            setCoordDistance(MinecraftUtils.getDistanceBetweenPoints(destination, from))
        }
        setCalculatingDistance(false);
    }

    function renderSpeeds() {
        if (coordDistance) {
            const times = MinecraftUtils.calculateTimeToDestination(coordDistance);

            const renderTimes = Object.keys(times).map(key => {
                const time = times[key];
                return (
                    <div key={key} className='time'>
                        <div className='speed-title'>{StringUtils.camelCaseToRegular(key, false, true)}</div>
                        {NumbersUtil.toDurationPretty(time * 1000)}
                    </div>
                )
            })

            return (
                <div className='speeds'>
                    {renderTimes}
                </div>
            )
        }
    }

    function onClickReset() {
        form.resetFields();
        setStateDestination(undefined);
        setStateFrom(undefined);
    }

    return (
        <div className='directions'>
            <div className={cx('header', {'destination-selected': stateDestination})}>
                <div className='title'>
                    Directions
                </div>
                <Button color='clear' icon={<SyncOutlined/>} onClick={onClickReset}>
                    Reset
                </Button>
            </div>
            <Form form={form} layout='vertical' onValuesChange={onValuesChange} onReset={onValuesChange}>
                <Form.Item name='destination'>
                    <CoordinateSelectAsInput placeholder='Search and Select a Destination'/>
                </Form.Item>
                {stateDestination &&
                <Form.Item name='from'>
                    <CoordinateSelectAsInput placeholder='From'/>
                </Form.Item>}
            </Form>
            {stateDestination && stateFrom &&
            <div className='bottom-info'>
                {Math.floor(coordDistance || 0)} Blocks
                {renderSpeeds()}
            </div>}
        </div>
    )
}

export default Directions;