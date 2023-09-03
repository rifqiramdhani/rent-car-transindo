import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import { Card, Col, Row, Table, Tag, Button, message } from "antd";
import moment from 'moment/moment';
import { useState, useEffect } from "react";
import { FcShipped, FcSurvey, FcUndo } from "react-icons/fc";

export default function  Dashboard({ flash, booking, countBooking, countCarActive, countCarReturn}) {
    const { Meta } = Card;
    const [loadingCard, setLoadingCard] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        console.log("status", flash);
        const onPageLoad = () => {
            setLoadingCard(false);
        };

        // Check if the page has already loaded
        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

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
            render: (_, record) => {
                return "Rp. " + record.car.rental_rate;
            },
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            render: (_, record) => {
                return moment().format("DD-MM-YYYY", record.start_date);
            },
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            render: (_, record) => {
                return moment().format("DD-MM-YYYY", record.end_date);
            },
        },

        {
            title: "Total Days",
            dataIndex: "total_days",
            render: (_, record) => {
                let dateFrom = new moment(record.start_date);
                let dateTo = new moment(record.end_date);
                let diff = dateFrom.to(dateTo);
                return diff.replace("in ", "");
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_, record) => {
                let status =
                    record.is_return == 0 ? (
                        <Tag color="green">Active</Tag>
                    ) : (
                        <Tag color="error">Has returned</Tag>
                    );

                return status;
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (_, record) => {
                if (record.return_date != null) {
                    return (
                        <Tag color="green">
                            {moment().format("DD-MM-YYYY", record.return_date)}
                        </Tag>
                    );
                } else {
                    return "";
                }
            },
        },
    ];

    useEffect(() => {
        if (flash.status !== null) {
            if (flash.status) {
                messageApi.success(flash.message);
            } else {
                messageApi.error(flash.message);
            }
        }
    }, [flash.status]);

    return (
        <DashboardLayout title="Dashboard">
            {contextHolder}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card bordered={true} loading={loadingCard}>
                                    <Meta
                                        avatar={<FcSurvey size={50} />}
                                        title="Total booking"
                                        description={
                                            countBooking == "0"
                                                ? "0"
                                                : countBooking
                                        }
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={true} loading={loadingCard}>
                                    <Meta
                                        avatar={<FcShipped size={50} />}
                                        title="My active car"
                                        description={
                                            countCarActive == "0"
                                                ? "0"
                                                : countCarActive
                                        }
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={true} loading={loadingCard}>
                                    <Meta
                                        avatar={<FcUndo size={50} />}
                                        title="Total return"
                                        description={
                                            countCarReturn == "0"
                                                ? "0"
                                                : countCarReturn
                                        }
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-10">
                            <Col span={24}>
                                <div className="w-full">
                                    <Table
                                        title={() => {
                                            return (
                                                <>
                                                    <div className="flex justify-between">
                                                        <div className="w-1/4 text-left">
                                                            <h3 className="font-bold text-xl">
                                                                My History
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }}
                                        columns={columns}
                                        bordered
                                        rowKey={(record) => record.id}
                                        dataSource={booking}
                                        loading={loadingCard}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
