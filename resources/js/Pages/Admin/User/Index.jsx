import DashboardLayout from '@/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Dropdown, Menu, Popconfirm } from "antd";
import qs from 'qs';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { router, usePage, useForm } from "@inertiajs/react";

const User = () => {
    const { Search } = Input
    const [dataUser, setDataUser] = useState();
    const [keyword, setKeyword] = useState("");
    const { users } = usePage().props;

    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
        keyword: ''
    });

    
    const {
        data,
        setData,
        delete: destroy,
    } = useForm({
        id: '',
    });


    /* handle delete */

    const deleteConfirm = (id) => {
        destroy(`/user/${id}`, {
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
                    onClick={() => router.get("user/" + id + "/edit")}
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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            key: 'name',
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.name.includes(value.toString())
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: true,
            key: 'address',
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.name.includes(value.toString())
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            sorter: true,
            key: 'phone_number',
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.name.includes(value.toString())
            }
        },
        {
            title: 'Drive Lincense',
            dataIndex: 'sim_number',
            sorter: true,
            key: 'sim_number',
            filteredValue: [keyword],
            onFilter: (value, record) => {
                return record.name.includes(value.toString())
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            key: 'email',
        },
       
        {
            title: "",
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => {
                return (
                    <>
                        <Dropdown overlay={menuDropdown(record.id)} trigger={["click"]} placement="bottomLeft" arrow>
                            <Button type="text"> <MoreOutlined /> </Button>
                        </Dropdown>
                    </>
                )
            },
            align: 'center'

        },
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = async () => {
        const { origin } = window.location;

        setLoading(true);

        fetch(`${origin}/api/users?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ data }) => {

                setDataUser(data.data);
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
            setDataUser([]);
        }
    };

    /* Handle Table */


    return (
        
        <DashboardLayout
            title="User"
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
                                                <Button type="primary" icon={<PlusOutlined />} onClick={() => router.get(route('user.create'))}> Add </Button>
                                            </div>
                                            <div className="w-1/4 text-right">
                                                <Search placeholder="Search Name" allowClear onSearch={handleSearch} style={{ width: 200 }} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }}
                            rowKey={(record) => record.id}
                            dataSource={dataUser}
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

export default User;
