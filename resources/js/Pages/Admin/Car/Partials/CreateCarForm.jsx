import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { Card, Button, Form, Input, InputNumber } from "antd";
import { useForm } from "@inertiajs/react";
import { FaCertificate, FaCarAlt, FaHackerNewsSquare } from "react-icons/fa";

const CreateCarForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        brand: "",
        model: "",
        license_plate: "",
        rental_rate: "",
    });

    const onFinish = (e) => {
        post(route("car.store"));
    };

    return (
        <DashboardLayout title="User Create Form">
            <div className="py-12">
                <div className="max-w-lg mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Card title="Create User" style={{ width: "100%" }}>
                            <Form
                                name="register"
                                className="login-form mt-5"
                                onFinish={onFinish}
                                id="components-form-demo-normal-login"
                            >
                                <Form.Item
                                    name="brand"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Brand!",
                                        },
                                    ]}
                                    validateStatus={
                                        errors.name ? "error" : "validating"
                                    }
                                    help={errors.name}
                                >
                                    <Input
                                        prefix={
                                            <FaCarAlt className="site-form-item-icon" />
                                        }
                                        placeholder="brand"
                                        id="brand"
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="model"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Model!",
                                        },
                                    ]}
                                    validateStatus={
                                        errors.name ? "error" : "validating"
                                    }
                                    help={errors.name}
                                >
                                    <Input
                                        prefix={
                                            <FaCertificate className="site-form-item-icon" />
                                        }
                                        placeholder="model"
                                        id="model"
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="license_plate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input License Plate!",
                                        },
                                    ]}
                                    validateStatus={
                                        errors.name ? "error" : "validating"
                                    }
                                    help={errors.name}
                                >
                                    <Input
                                        prefix={
                                            <FaHackerNewsSquare className="site-form-item-icon" />
                                        }
                                        placeholder="license Plate"
                                        id="license_plate"
                                        value={data.license_plate}
                                        onChange={(e) =>
                                            setData(
                                                "license_plate",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="rental_rate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Rental Rate!",
                                        },
                                    ]}
                                    validateStatus={
                                        errors.name ? "error" : "validating"
                                    }
                                    help={errors.name}
                                >
                                    <InputNumber
                                        className="w-full"
                                        prefix="Rp"
                                        suffix="/day"
                                        placeholder="Rental Rate"
                                        id="rental_rate"
                                        value={data.rental_rate}
                                        onChange={(e) =>
                                            
                                            setData(
                                                "rental_rate",
                                                e
                                            )
                                        }
                                    />
                                </Form.Item>

                                <Form.Item className="flex items-center justify-end mt-4">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={processing}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateCarForm;
