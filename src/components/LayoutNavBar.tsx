import React, { useState } from 'react';
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input } from 'antd';
import "../index.scss";




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
        label: 'Home',
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
                    {
                        label: 'Registration',
                        key: 'registration',
                    },
                    {
                        label: 'Login',
                        key: 'login',
                    },
                ],
            },
        ],
    },
];

const NavBar: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavBar;