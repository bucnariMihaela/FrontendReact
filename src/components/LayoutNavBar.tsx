// @ts-ignore
import React, {useContext, useState} from 'react';
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input } from 'antd';
import "../index.scss";
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import { Badge } from 'antd';
import CartContext from "./CartContext";




const NavBar: React.FC = () => {
    const [current, setCurrent] = useState('dashboard');
    const { authState, setAuthState } = useAuth();

    const { cartItems } = useContext(CartContext);
    const itemCount = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);


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
            label:
                <Link to="/shopping-cart">My Cart</Link>,
            key: 'cart',
            icon:(
                <Badge count={itemCount} showZero>
                    <ShoppingCartOutlined style={{fontSize:'18px'}}/>
                </Badge>
            ),
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
                        },
                        authState.isAuthenticated && {
                            label: <Link to="/admin-all-products"> Admin - All Products</Link>,
                            key: 'admin',
                        } ,
                        authState.isAuthenticated && {
                            label: <Link to="/admin-create-color"> Admin - Create Color</Link>,
                            key: 'admin',
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