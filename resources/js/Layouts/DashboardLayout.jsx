import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import SidebarAdmin from "@/Components/Sidebar/Admin";
import { Head, Link } from "@inertiajs/react";
import {
    Layout,
    Button,
    theme,
    Avatar,
    Dropdown,
    Space,
    Breadcrumb,
} from "antd";

const { Header, Content } = Layout;

const items = [
    {
        key: "1",
        label: (
            <Link rel="noopener noreferrer" href={route("profile.edit")}>
                Profile
            </Link>
        ),
        icon: <UserOutlined />,
    },
    {
        key: "2",
        label: (
            <Link
                method="post"
                as="button"
                rel="noopener noreferrer"
                href={route("logout")}
            >
                Logout
            </Link>
        ),
        icon: <LogoutOutlined />,
    },
];

const itemRender = (route, params, items, paths) => {
    const last = items.indexOf(route) === items.length - 1;
    const { origin } = window.location;

    return last ? (
        <span>{route.title}</span>
    ) : (
        <Link href={origin + "/" + paths.join("/")}>{route.title}</Link>
    );
};

const DashboardLayout = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = window.location;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }} hasSider>
            <Head>
                <title>{title}</title>
            </Head>

            <SidebarAdmin collapsed={collapsed} />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="flex justify-between">
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Dropdown menu={{ items }}>
                            <div className="mr-4">
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar
                                            size="large"
                                            icon={<UserOutlined />}
                                        />
                                    </Space>
                                </a>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
