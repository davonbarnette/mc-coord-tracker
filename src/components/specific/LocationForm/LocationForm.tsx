import React, {useEffect, useState} from 'react';
import {Form, Input, Row, Col} from "antd";

import './styles.scss';

import Button from "../../common/Button/Button";

import cx from "classnames";
import CoordinatesAPI from "../../../api/CoordinatesAPI";
import {LocationFormTypes} from "./Types";
import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import WorldSelect from "../WorldSelect/WorldSelect";


interface Props {
    applyDrawerStyles?: boolean
    onSubmit?: (values: any) => void,
    coordinate?: IMinecraftCoordinate,
}

function LocationForm(props: Props) {
    const {applyDrawerStyles, onSubmit} = props;
    const [form] = Form.useForm();

    // eslint-disable-next-line
    const [valuesForm, setValuesForm] = useState({});
    const [submittingForm, setSubmittingForm] = useState(false);


    useEffect(() => {

        return function cleanup() {
            form.resetFields();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const initialValues = {
    }
    const formProps = {
        colon: false,
        className: cx('location-form', {'as-drawer': applyDrawerStyles})
    };

    async function onSubmitClick() {
        if (submittingForm) return false;
        setSubmittingForm(true);
        try {
            let valid = await form.validateFields();
            if (!valid.errorFields) {
                let values = form.getFieldsValue();
                await CoordinatesAPI.createCoordinates(values);
                if (onSubmit) onSubmit(values);
            }
        } catch (e) {

        }
        setSubmittingForm(false);
    }

    function onValuesChange(v) {
        setValuesForm(v)
    }

    function renderButton() {
        if (applyDrawerStyles) {
            return (
                <div className='form-stickied-footer'>
                    <Button onClick={onSubmitClick} htmlType='submit' loading={submittingForm}>
                        Create Location
                    </Button>
                </div>
            )
        } else {
            return (
                <Button onClick={onSubmitClick} htmlType='submit' loading={submittingForm}>
                    Create Location
                </Button>
            )
        }
    }

    return (
        <div className='location-form-wrapper'>
            <Form {...formProps} layout='vertical' form={form} onValuesChange={onValuesChange}
                  initialValues={initialValues} requiredMark='optional'>
                <Form.Item label='Location Name' name={LocationFormTypes.Name}
                           validateTrigger='onSubmit'
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label='X' name={LocationFormTypes.X}
                                   validateTrigger='onSubmit'
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <Input size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Y' name={LocationFormTypes.Y} validateTrigger='onSubmit'>
                            <Input size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Z' name={LocationFormTypes.Z}
                                   validateTrigger='onSubmit'
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <Input size='large'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Owner' name={LocationFormTypes.Owner}
                           validateTrigger='onSubmit'
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='World' name={LocationFormTypes.World}
                           validateTrigger='onSubmit'
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <WorldSelect/>
                </Form.Item>
                <Form.Item label='Description' name={LocationFormTypes.Description}
                           validateTrigger='onSubmit'>
                    <Input.TextArea size='large'/>
                </Form.Item>
            </Form>

            {renderButton()}
        </div>
    )
}

export default LocationForm;