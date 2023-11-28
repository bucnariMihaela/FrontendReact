import * as React from 'react';
import {Button, Form, Input, InputNumber, notification} from "antd";
import {useState} from "react";
import {Color as ColorType} from "../components/Types";

type ColorFormType = {
    colorName?: string;
    red?: number;
    green?: number;
    blue?: number;
}


const AdminPageCreateColor: React.FC = () => {

    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();

    const onSubmit = (values: ColorFormType) => {
        fetch("http://localhost:8080/color",{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...values}),
            headers: { 'Content-Type': 'application/json'},
        })
            .then(res => {

                if(!res.ok) {
                    throw new Error('server response is not ok')
                }

                openNotification();
                form.resetFields();

                return res;

            })
    }

    const openNotification = () => {
        api.open({
            message: 'Succes',
            description:
                'The color was created successfully!',
        });
    };


    return (
        <>
            {contextHolder}
            <Form onFinish={onSubmit}
                  name="basic"
                  form={form}
                  style={{maxWidth: 600, marginLeft: 100}}
                  layout="vertical"
                  autoComplete="off">


                <Form.Item
                    label="Color Name"
                    name="colorName"
                    rules={[{required: true, max: 255}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Red"
                    name="red"
                    rules={[{required: true, type: 'number', min: 0}]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="Green"
                    name="green"
                    rules={[{required: true, type: 'number', min: 0}]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="Blue"
                    name="blue"
                    rules={[{required: true, type: 'number', min: 0}]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );

}



export default AdminPageCreateColor;
