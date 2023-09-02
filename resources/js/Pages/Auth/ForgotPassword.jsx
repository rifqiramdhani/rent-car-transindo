import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onFinish = (e) => {
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Form
                name="normal_login"
                className="login-form mt-5"
                onFinish={onFinish}
                id="components-form-demo-normal-login"
            >
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
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Item>

                <Form.Item className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    >
                        Login
                    </Link>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                    >
                        Email Password Reset Link
                    </Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
