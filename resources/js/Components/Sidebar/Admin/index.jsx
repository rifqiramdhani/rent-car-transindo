import { Link } from '@inertiajs/react';
import React from 'react';
import { router } from '@inertiajs/react'

import { Layout, Menu } from 'antd';
import {
    FaTachometerAlt,
    FaCarAlt,
    FaRegCalendarAlt,
    FaReply,
} from "react-icons/fa";

const SidebarAdmin = ({ collapsed }) => {
    const { Sider } = Layout;

    function getItem(
        label,
        key,
        icon,
        children
    ) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const selectMenuItem = (value) => {
        const { origin } = window.location

        router.visit(origin + "/" + value.key, { method: 'get' });
    }

    const items = [
        getItem("Dashboard", "dashboard", <FaTachometerAlt />),
        getItem("Car", "car", <FaCarAlt />),
        getItem("Booking", "booking", <FaRegCalendarAlt />),
        getItem("Return", "return", <FaReply />),
    ];

    return (
        
        <Sider trigger={null} collapsible collapsed={collapsed} >
            <div className="flex justify-center align-items-center flex-row p-3">
                <div className="col-12">
                    <div className="h-10 w-10 mx-auto">
                        <Link href={route('dashboard')} className="text-center p-0">
                            <img src={('/images/rent-car.jpg')} width={100} height={100} alt="Homelything Logo" className="h-full w-full m-0" />
                        </Link>
                    </div>
                    <p className="text-white text-center">Automotive</p>
                </div>
            </div>

          
            <Menu
                defaultSelectedKeys={['dashboard']}
                mode="vertical"
                items={items}
                theme="dark"
                onSelect={selectMenuItem}
                selectedKeys={[location.pathname.substring(7)]}
            />
        </Sider>
    )
}

export default SidebarAdmin
