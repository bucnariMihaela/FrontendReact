import * as React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../components/AuthProvider";


type LoginFormType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth();

    const onFinish = (values: LoginFormType) => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            credentials: 'include',
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
                setAuthState({ isAuthenticated: true, userRole: 'customer', userUsername: values.username });
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

            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
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
