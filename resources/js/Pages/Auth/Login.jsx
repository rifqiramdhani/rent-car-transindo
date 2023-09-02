import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import { Button, Checkbox, Form, Input } from 'antd';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onFinish = (e) => {
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head>
                <title>Login</title>
                <meta name="description" content="Halaman Login" />
            </Head>

            {status && <div className="mb-4 font-medium text-sm">{status}</div>}

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
                            message: 'Please input your E-mail!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}

                    
                    validateStatus={errors.email ? 'error' : 'validating'}
                    help={errors.email}


                >
                    <Input
                        prefix={<FaEnvelope
                            className="site-form-item-icon" />}
                        placeholder="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        
                    ]}
                    validateStatus={errors.password ? 'error' : 'validating'}
                    help={errors.password}
                >
                    <Input
                        prefix={<FaLock className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Form.Item>



                <Form.Item>
                    <Form.Item
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                        noStyle
                    >
                        <Checkbox
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        >
                            Remember me
                        </Checkbox>
                    </Form.Item>


                    {
                        canResetPassword && (
                            <Link
                            href={route('password.request')}
                                className="login-form-forgot text-smrounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-gray-800 hover:text-[#D5B06A]"
                            
                        >
                            Forgot your password?
                        </Link>

                        )
                    }

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={processing}>
                        Log in
                    </Button>
                    Or <Link href="register"> register now!</Link>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
