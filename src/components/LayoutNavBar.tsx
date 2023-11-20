import React, { useState } from 'react';
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input } from 'antd';
import "../index.scss";
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";



const NavBar: React.FC = () => {
    const [current, setCurrent] = useState('dashboard');
    const { authState, setAuthState } = useAuth();



    const items: MenuProps['items'] = [

        {
            label: (
                <Input
                    placeholder="input search text"
                    prefix={<SearchOutlined />}
                ></Input>
            ),
            key:'search'
        },
        {
            label: <Link to="/dashboard">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },

        {
            label: 'My Cart',
            key: 'cart',
            icon: <ShoppingCartOutlined />,
        },
        {
            label: 'Profile',
            key: 'profile',
            icon: <UserOutlined />,
            children: [
                {
                    type: 'group',
                    children: [

                        !authState.isAuthenticated && {
                            label: <Link to="/registration"> Registration</Link>,
                            key: 'registration'
                        },

                        !authState.isAuthenticated &&  {
                            label: <Link to="/login"> Login</Link>,
                            key: 'login',
                        },

                        authState.isAuthenticated && {
                            label: <Link to="/logout"> Logout</Link>,
                            key: 'logout',
                        } ,
                    ],
                },
            ],
        },
    ];


    const onClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };



    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavBar;