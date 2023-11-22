import * as React from 'react';
import {Button, Form, Input, InputNumber, Select, Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {Product} from "../components/Dashboard";
import {Color} from "../components/Types";


const AdminPage: React.FC = () => {

    const [colors, setColors] = useState<Color[]>([]);
    useEffect(() => {
        fetch('http://localhost:8080/color',{
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200) {
                    console.log(data);
                    setColors(data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <Form name="basic" style={{maxWidth: 600}} layout="vertical" autoComplete="off">


            <Form.Item
                label=" Product Name"
                name="productName"
                rules={[{required: true, max: 255}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{required: true, max: 255}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Price"
                name="Price"
                rules={[{required: true, type: 'number', min: 0}]}
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item
                label="Quantity"
                name={['stock', 'quantity']}
                rules={[{required: true, type: 'number', min: 0}]}
            >
                <InputNumber/>
            </Form.Item>
            <Select
                showSearch
                placeholder="Select a color for product"
                optionFilterProp="children"
                options={colors && colors?.map(color => ({
                    value: color.id,
                    label: color.colorName
                }))}
            />

        </Form>
    );
}

export default AdminPage;
