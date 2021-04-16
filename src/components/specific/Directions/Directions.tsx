import React from 'react';

import './styles.scss';

import CoordinateSelect from "../CoordinatesSelect/CoordinatesSelect";
import {Form} from "antd";

function Directions(){
    const [form] = Form.useForm();

    return (
        <div className='directions'>
            <Form form={form} layout='vertical'>
                <Form.Item label='Destination'>
                    <CoordinateSelect/>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Directions;