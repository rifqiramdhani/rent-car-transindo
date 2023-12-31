import DashboardLayout from '@/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react';
import {
    Table,
    Input,
    Button,
    Dropdown,
    Menu,
    Popconfirm,
    Tag,
    Space,
    DatePicker,
    Form,
    message,
} from "antd";
import qs from 'qs';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { router, usePage, useForm, Link } from "@inertiajs/react";

const Booking = () => {
    const [dataBooking, setDataBooking] = useState();
    const [searchDate, setSearchDate] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        keyword: ''
    });

    
    const {
    } = useForm({
        id: '',
    });


    
    /* handle book */
    const handleBook = (id) => {
        setLoadingButton(true)
        router.post(
            route("booking.store"),
            {
                started_date: searchDate[0],
                ended_date: searchDate[1],
                car_id: id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    messageApi.success(
                        "Your have successfully booking!",
                        0.5,
                        fetchData()
                    );
                    setLoadingButton(false);

                },
                onFinish: () => {
                    setLoadingButton(false);
                },
            }
        );
    };
    /* endhandle book */

    /* Handle Table */
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
                        
        {
            title: "Model",
            dataIndex: "model",
            key: "model",
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            key: "license_plate",
        },
        {
            title: "Rental Rate",
            dataIndex: "rental_rate",
            render: (_, record) => {
                return "Rp " + record.rental_rate;
            },
        },
        {
            title: "Status",
            dataIndex: "is_available",
            render: (_, record) => {
                let status =
                    record.is_available == 1 ? (
                        <Tag color="green">Available</Tag>
                    ) : (
                        <Tag color="red">Not Available</Tag>
                    );

                return status;
            },
        },
        {
            title: "",
            dataIndex: "id",
            render: (_, record) => {
                return (
                    <Tag color="blue">
                        <Button
                            typeHtml="button"
                            type="text"
                            onClick={() => handleBook(record.id)}
                            loading={loadingButton}
                        >
                            Book Now
                        </Button>
                    </Tag>
                );
            },
        },
    ];

    const getRandombookingParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = async () => {
        const { origin } = window.location;

        setLoading(true);

        fetch(
            `${origin}/api/cars/available?${qs.stringify(
                getRandombookingParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then(({ data }) => {

                setDataBooking(data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.length,
                    },
                });
            });
    };

    

    const handleTableChange= (
        pagination,
        filters,
        sorter
    ) => {

        setTableParams({
            pagination,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataBooking([]);
        }
    };

    /* Handle Table */

    const { RangePicker } = DatePicker;

    return (
        <DashboardLayout title="Booking">
            {contextHolder}
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-center flex-col">
                            <div className="w-full mb-5 text-center">
                                <Space direction="vertical" size={12}>
                                    <Form
                                        name="register"
                                        className="login-form mt-5"
                                        onFinish={fetchData}
                                        id="components-form-demo-normal-login"
                                    >
                                        <Form.Item
                                            name="date"
                                            label="Date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input date!",
                                                },
                                            ]}
                                            
                                        >
                                            <RangePicker
                                                onChange={(dates, dateString) =>
                                                    setSearchDate(dateString)
                                                }
                                            />
                                        </Form.Item>

                                        <Form.Item className="flex items-center justify-center mt-4">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Space>
                            </div>
                            <div className="w-full">
                                <Table
                                    columns={columns}
                                    bordered
                                    rowKey={(record) => record.id}
                                    dataSource={dataBooking}
                                    pagination={tableParams.pagination}
                                    loading={loading}
                                    onChange={handleTableChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Booking;
