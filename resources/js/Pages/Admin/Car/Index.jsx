import DashboardLayout from '@/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Dropdown, Menu, Popconfirm, Tag } from "antd";
import qs from 'qs';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { router, usePage, useForm } from "@inertiajs/react";

const Car = () => {
    const { Search } = Input
    const [dataCar, setDataCar] = useState();
    const [keyword, setKeyword] = useState("");

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


    /* handle delete */

    const deleteConfirm = (id) => {
        destroy(`/car/${id}`, {
            preserveScroll: true,
            onSuccess: () => fetchData(),
            onFinish: () => fetchData(),
        });
    }
    
    /* handle dropdown menuDropdown */
    const menuDropdown = (id) => {
        return (
            <Menu>
                <Menu.Item
                    key={`Edit${id}`}
                    onClick={() => router.get("car/" + id + "/edit")}
                >
                    Edit
                </Menu.Item>
                <Menu.Item key={`Delete${id}`}>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete data?"
                        onConfirm={() => {
                            if ({ confirm }) {
                                deleteConfirm(id);
                            }
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="topLeft"
                        // icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                        Delete
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    }
    /* endhandle dropdown menu */

    /* handle search */
    const handleSearch = (e) => {
        // setloading true
        setKeyword(e)

        // console.log(data)

        setTableParams({
            ...tableParams,
            keyword: e
        });
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
            sorter: true,
            key: "brand",
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.brand.includes(value.toString());
            },
        },
        {
            title: "Model",
            dataIndex: "model",
            sorter: true,
            key: "model",
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.model.includes(value.toString());
            },
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            sorter: true,
            key: "license_plate",
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.license_plate.includes(value.toString());
            },
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
            key: "id",
            render: (_, record) => {
                return (
                    <>
                        <Dropdown
                            overlay={menuDropdown(record.id)}
                            trigger={["click"]}
                            placement="bottomLeft"
                            arrow
                        >
                            <Button type="text">
                                {" "}
                                <MoreOutlined />{" "}
                            </Button>
                        </Dropdown>
                    </>
                );
            },
            align: "center",
        },
    ];

    const getRandomcarParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = async () => {
        const { origin } = window.location;

        setLoading(true);

        fetch(`${origin}/api/cars?${qs.stringify(getRandomcarParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ data }) => {

                console.log(data)

                setDataCar(data.data);
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
            setDataCar([]);
        }
    };

    /* Handle Table */


    return (
        
        <DashboardLayout
            title="Car"
        >
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <Table
                            columns={columns}
                            bordered
                            title={() => {
                                return (
                                    <>
                                        <div className="flex justify-between">
                                            <div className="w-1/4 text-left">
                                                <Button type="primary" icon={<PlusOutlined />} onClick={() => router.get(route('car.create'))}> Add </Button>
                                            </div>
                                            <div className="w-1/4 text-right">
                                                <Search placeholder="Search Name" allowClear onSearch={handleSearch} style={{ width: 200 }} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }}
                            rowKey={(record) => record.id}
                            dataSource={dataCar}
                            pagination={tableParams.pagination}
                            loading={loading}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Car;
