import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button, Form, Input, Select, InputNumber } from "antd";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    FaEnvelope,
    FaUser,
    FaLock,
    FaPhoneAlt,
    FaAddressCard,
    FaHome,
} from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone_number: "",
        sim_number: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

   const onFinish = (e) => {

       post(route("register"));
   };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form
                name="register"
                className="login-form mt-5"
                onFinish={onFinish}
                id="components-form-demo-normal-login"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Name!",
                        },
                    ]}
                    validateStatus={errors.name ? "error" : "validating"}
                    help={errors.name}
                >
                    <Input
                        prefix={<FaUser className="site-form-item-icon" />}
                        placeholder="Name"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                    validateStatus={errors.phone ? "error" : "validating"}
                    help={errors.phone}
                >
                    <InputNumber
                        style={{
                            width: "100%",
                        }}
                        prefix={<FaPhoneAlt className="site-form-item-icon" />}
                        placeholder="Phone Number"
                        onChange={(e) => setData("phone_number", e)}
                    />
                </Form.Item>

                <Form.Item
                    name="sim_number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your sim number!",
                        },
                    ]}
                    validateStatus={errors.sim_number ? "error" : "validating"}
                    help={errors.sim_number}
                >
                    <InputNumber
                        style={{
                            width: "100%",
                        }}
                        prefix={
                            <FaAddressCard className="site-form-item-icon" />
                        }
                        placeholder="Drive license"
                        onChange={(e) => setData("sim_number", e)}
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Address",
                        },
                    ]}
                    validateStatus={errors.address ? "error" : "validating"}
                    help={errors.address}
                >
                    <Input.TextArea
                        showCount
                        maxLength={100}
                        placeholder="Address"
                        prefix={<FaHome className="site-form-item-icon" />}
                        onChange={(e) => setData("address", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                    ]}
                    validateStatus={errors.email ? "error" : "validating"}
                    help={errors.email}
                >
                    <Input
                        prefix={<FaEnvelope className="site-form-item-icon" />}
                        placeholder="Email"
                        id="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                    validateStatus={errors.password ? "error" : "validating"}
                    help={errors.password}
                >
                    <Input
                        prefix={<FaLock className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The new password that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                    validateStatus={
                        errors.password_confirmation ? "error" : "validating"
                    }
                    help={errors.password_confirmation}
                >
                    <Input
                        prefix={<FaLock className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirmation Password"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    >
                        Already registered?
                    </Link>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                    >
                        Register Now!
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
