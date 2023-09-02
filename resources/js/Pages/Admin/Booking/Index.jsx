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
} from "antd";
import qs from 'qs';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { router, usePage, useForm } from "@inertiajs/react";

const Booking = () => {
    const { Search } = Input
    const [dataBooking, setDataBooking] = useState();
    const [keyword, setKeyword] = useState("");
    const [searchDate, setSearchDate] = useState([]);

    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        keyword: ''
    });

    
    const {
        delete: destroy,
    } = useForm({
        id: '',
    });


    
    /* handle search */
    const handleSearch = (e) => {
        // setloading true
        setKeyword(e)

        // console.log(data)

    };
    /* endhandle search */

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
    ];

    const getRandombookingParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = async () => {
        const { origin } = window.location;

        setLoading(true);

        fetch(`${origin}/api/cars?${qs.stringify(getRandombookingParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ data }) => {

                setDataBooking(data.data);
                setLoading(false);
                
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.total,
                    }
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    

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
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-center flex-col">
                            <div className="w-full mb-5 text-center">
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        onChange={(dates, dateString) =>
                                            setSearchDate(dateString)
                                        }
                                    />

                                    <Button type="primary" onClick={() => fetchData()}>Search</Button>
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
