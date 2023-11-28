
import {Button, Form, Input, InputNumber, notification, Select, Space, Upload} from 'antd';
import {useEffect, useState} from "react";
import {Color as ColorType} from "../components/Types";
import { UploadOutlined } from '@ant-design/icons';

type ProductFormType = {
    productName?: string;
    description?: string;
    price?: number;
    stock?: {
        quantity?: number;
    }
    colors?: string[];
    image?: string;
};

const AdminPageCreateProduct: React.FC = () => {

    const [colors, setColors] = useState<ColorType[]>([]);

    const [selectedColors, setSelectedColors] = useState<{ id: string }[]>([]);

    const [base64String, setBase64String] = useState('');

    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();



    useEffect(() => {
        fetch('http://localhost:8080/color',{
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                    setColors(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleColorChange = (selected) => {
        const selectedColorsObj = selected.map(id => ({id}));
        setSelectedColors(selectedColorsObj); //
    };

    const handleFileChange = (info) => {
        console.log(info)
            const reader = new FileReader();
            reader.readAsDataURL(info?.fileList[0]?.originFileObj);
            reader.onload = () => {
                setBase64String(reader.result as string);
            };
    };



    const onSubmit = (values: ProductFormType) => {

        fetch("http://localhost:8080/products",{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...values, image:base64String, colors:selectedColors}),
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
                'The product was created successfully!',
        });
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (<>
            {contextHolder}
        <Form onFinish={onSubmit}
            name="basic"
              form={form}
              style={{maxWidth: 600, marginLeft: 100}}
              layout="vertical"
              autoComplete="off">


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
                name="price"
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

            <Form.Item
                label="Select a Color"
                name="colors"
                rules={[{ required: true, message: 'Please select a color!' }]}
                >
            <Select
                mode="multiple"
                showSearch
                placeholder="Select a color for product"
                optionFilterProp="children"
                onChange ={handleColorChange}
                options={(colors && Array.isArray(colors)) && colors?.map(color => ({
                    value: color.id,
                    label: color.colorName
                }))}
            />
        </Form.Item>

            <Form.Item
                name="image"
                label="Upload Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Select an image to upload"
            >
                <Upload beforeUpload={()=>{return false}} name="logo" onChange={handleFileChange} listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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

export default AdminPageCreateProduct;
