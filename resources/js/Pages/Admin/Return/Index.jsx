import DashboardLayout from '@/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tag, Space, Form, message } from "antd";
import qs from 'qs';
import { FaHackerNewsSquare } from 'react-icons/fa'
import { router, usePage, useForm, Link,  } from "@inertiajs/react";
import moment from 'moment';

const Return = ({ flash }) => {
    const user = usePage().props.auth.user;
    const [dataReturn, setDataReturn] = useState();
    const [searchDate, setSearchDate] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        licensePlate: "",
        userId: user.id,
    });

    const {} = useForm({
        id: "",
    });

    /* handle book */
    const handleReturn = (id, carId) => {
        setLoadingButton(true);
        router.post(
            route("return.store"),
            {
                id: id,
                car_id: carId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    messageApi.success("Your have successfully return!", 0.5);
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
            render: (_, record) => {
                return record.car.brand;
            },
        },

        {
            title: "Model",
            dataIndex: "model",
            key: "model",
            render: (_, record) => {
                return record.car.model;
            },
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            key: "license_plate",
            render: (_, record) => {
                return record.car.license_plate;
            },
        },
        {
            title: "Rental Rate",
            dataIndex: "rental_rate",
            key: "rental_rate",
            render: (_, record) => {
                return "Rp " + record.car.rental_rate;
            },
        },
        {
            title: "Status",
            dataIndex: "is_return",
            key: "is_return",
            render: (_, record) => {
                let status =
                    record.is_return == 0 ? (
                        <Tag color="green">Active</Tag>
                    ) : (
                        <Tag color="red">Already Returned</Tag>
                    );

                return status;
            },
        },
        {
            title: "Total Days",
            dataIndex: "total_day",
            render: (_, record) => {
                let dateFrom = new moment(record.start_date);
                let dateTo = new moment(record.end_date);
                let diff = dateFrom.to(dateTo);
                return diff.replace("in ", "");
            },
        },
        {
            title: "Total Cost",
            dataIndex: "total_cost",
            render: (_, record) => {
                let dateFrom = new moment(record.start_date);
                let dateTo = new moment(record.end_date);
                let diff = dateFrom.to(dateTo);
                let filterDiff = diff.replace("in ", "").replace("days", "");
                let totalCost = parseInt(record.car.rental_rate) * parseInt(filterDiff);
                return "Rp " + totalCost;
            },
        },
        {
            title: "",
            dataIndex: "id",
            render: (_, record) => {
                return record.is_return == 0 ? (
                    <Tag color="blue" className="text-center">
                        <Button
                            type="text"
                            onClick={() =>
                                handleReturn(record.id, record.car.id)
                            }
                            loading={loadingButton}
                        >
                            Return Now
                        </Button>
                    </Tag>
                ) : (
                    ""
                );
            },
        },
    ];

    const getRandomreturnParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = async () => {
        const { origin } = window.location;

        setLoading(true);

        fetch(
            `${origin}/api/returns?${qs.stringify(
                getRandomreturnParams(tableParams)
            )}`
        )
            .then((res) => res.json())
            .then(({ data, status, message }) => {
                if (status) {
                    setDataReturn(data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: data.length,
                        },
                    });
                } else {
                    messageApi.error(message);
                    setLoading(false);
                }
            });
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataReturn([]);
        }
    };

    /* Handle Table */

    useEffect(() => {
        if(flash.status !== null){
            if (flash.status) {
                messageApi.success(flash.message);
            } else {
                messageApi.error(flash.message);
            }
        }
        
    }, [flash.status]);

    return (
        <DashboardLayout title="Return">
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
                                            name="license_plate"
                                            label="License Plate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input License Plate!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <FaHackerNewsSquare className="site-form-item-icon" />
                                                }
                                                placeholder="license Plate"
                                                id="license_plate"
                                                onChange={(e) =>
                                                    setTableParams({
                                                        ...tableParams,
                                                        licensePlate:
                                                            e.target.value,
                                                    })
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
                                    dataSource={dataReturn}
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

export default Return;
