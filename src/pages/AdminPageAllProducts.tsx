import * as React from 'react';
import {Button, Col, Form, Input, InputNumber, Modal, notification, Select, Table, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    Color as ColorType,
    Product as ProductType
} from "../components/Types";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';



const AdminPageAllProducts: React.FC = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<ProductType[]>([]);

    const [api, contextHolder] = notification.useNotification();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedProduct, setSelectedProduct]= useState<ProductType>(null);

    const [colors, setColors] = useState<ColorType[]>([])

    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const [form] = Form.useForm();





    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:8080/products')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    const onDeleteProduct = id => {
        fetch('http://localhost:8080/products/delete-by/'+ id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server response is not ok');
                }

                deleteNotification();
                fetchProducts();
    })
            .catch(error => {
                console.error('Error deleting the product:', error);
            })


    };

    const deleteNotification = () => {
        api.open({
            message: 'Succes',
            description:
                'The product was deleted successfully!',
        });
    };



    const onEdit = (values: ProductType) => {

        const convertedColors = selectedColors?.map(selectedColor =>{
            return {id:selectedColor}
        })

        fetch("http://localhost:8080/products/update-by/"+ selectedProduct.id,
            {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
                body:JSON.stringify({...values, colors:convertedColors}),
        })
            .then(res => {

                if(!res.ok) {
                    throw new Error('server response is not ok')
                }


                setIsModalOpen(false)
                createNotification()
                fetchProducts()

                return res;

            })
    }

    const createNotification = () => {
        api.open({
            message: 'Succes',
            description:
                'The product was edited successfully!',
        });
    };

    const showModal = () => {
        setIsModalOpen(true);

    };


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
    }, [isModalOpen]);


    const handleColorChange = (selectedIds: string[]) => {
        setSelectedColors(selectedIds); // doar setează array-ul de ID-uri
    };


    useEffect(() => {
        if (isModalOpen && selectedProduct) {
            // Resetarea formularului și setarea noilor valori
            form.resetFields();
            form.setFieldsValue(selectedProduct);
        }
    },[isModalOpen, selectedProduct, form]);


    const handleAddProductClick = () => {
        navigate('/admin-create-product');
    }

    const columns: ColumnsType<ProductType> = [
        { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Stock (Quantity)',
            dataIndex: 'stock',
            key: 'stock',
            render:(_, record) => record.stock.quantity,
        },
        {
            title: 'Available colors',
            dataIndex: 'colors',
            key: 'colors',
            render:(_, record) => record?.colors?.map(color => color.colorName).join(",")
        },
        {
            title: 'Action',
            dataIndex:'delete',
            key: 'delete',
            render: (_, record) => <a onClick={() => onDeleteProduct(record.id)}>Delete</a>
        },
        {
            title: 'Action',
            dataIndex:'edit',
            key: 'edit',
            render: (_, record) => <a onClick={() => {
                console.log(record)
                setSelectedProduct(record)
                const colorIds = record.colors?.map(color => {return color.id})
                setSelectedColors(colorIds)
                showModal()
            }}>Edit</a>,
        },
        {
            title: 'Action',
            dataIndex:'add',
            key: 'add',
            render: (_, record) => <a onClick={handleAddProductClick}>Add Product</a>,
        },
    ];

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
            {contextHolder}
    <Table
        columns={columns}
        dataSource={products}

    />

            <Modal title="Edit Product"
                   open={isModalOpen}
                  onCancel={handleCancel}
                   footer={null}

            >
                <Col>
                <Form
                    form={form}
                    onFinish={onEdit}
                      name="basic"
                      style={{maxWidth: 600, marginLeft: 100}}
                      layout="vertical"
                      initialValues={selectedProduct}
                      autoComplete="off">

                    <Form.Item
                        label="Product Name"
                        name="productName"

                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"

                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{required: true, type: 'number', min: 1}]}

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
                        label="Add or Delete a Color"
                        rules={[{ required: true, message: 'Please select a color!' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select a color for product"
                            optionFilterProp="children"
                            onChange ={handleColorChange}
                            value={selectedColors}
                            options={colors && colors?.map(color => ({
                                value: color.id,
                                label: color.colorName

                            }))}
                            >

                        </Select>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
            </Modal>
        </>
);
}
export default AdminPageAllProducts;
