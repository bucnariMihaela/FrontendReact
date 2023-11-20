import * as React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../components/AuthProvider";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth();

    const onFinish = (values: FieldType) => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('server response is not ok')
                }
                return res;
            })
            .then(json =>{
                setAuthState({ isAuthenticated: true, userRole: 'user' });
                navigate('/dashboard');
            })
    }

    return (
        <Form onFinish={onFinish}
              name="basic"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              autoComplete="off"
        >

            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
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

export default Login;
