import * as React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


type FieldType = {
    name: string;
    email?: string;
    age: number;
    username?: string;
    password?: string;
    confirmPassword?: string;
    remember?: string;
};

const Registration: React.FC = () => {

    const navigate = useNavigate();
    const onFinish = (values: FieldType) => {
        fetch('http://localhost:8080/user/registration', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('server response is not ok')
                }
                return res.json();
            })
            .then(json =>{
                navigate('/login');
            })
    }

    return (
        <Form onFinish={onFinish}
            name="trigger"
              style={{maxWidth: 600}}
            layout="vertical"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            autoComplete="off"
        >

            <Form.Item<FieldType>
                hasFeedback
                label="Name"
                name="name"
                validateTrigger="onBlur"
                rules={[{required: true, max:255, message: 'Please input your name!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                hasFeedback
                label="Email"
                name="email"
                rules={[
                    {required: true,
                        message: 'Please input your email!'},
                    () => ({
                        validator(_, value) {
                            if (value && value.includes('@')) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Email must contain @'));
                        },
                    }),
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                hasFeedback
                label="Age"
                name="age"
                rules={[
                    {required: true,
                        message: 'Please input your age!'},

                    () => ({
                        validator(_, value) {
                            if (!value || (value >= 18)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('You must be at least 18 years old!'));
                        },
                    }),
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                hasFeedback
                label="Username"
                name="username"
                rules={[{required: true,max:255, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                hasFeedback
                label="Password"
                name="password"
                rules={[{required: true,max:255, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldType>
                hasFeedback
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {required: true,max:255, message: 'Please input your password!'},

                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The passwords do no match'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{offset: 8, span: 16}}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

};

export default Registration;
