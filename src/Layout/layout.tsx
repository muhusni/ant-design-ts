import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const { logout } = useAuth();
    const logoutRequest = async () => {
        await logout();
      };


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation(); // Get the current route
    const selectedKey = location.pathname; // Use the pathname as the selected key

    return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical">APP</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[selectedKey]}
                        items={[
                            {
                                key: "/",
                                icon: <UserOutlined />,
                                label: <Link to={"/"}>Home</Link>,
                            },
                            {
                                key: "/to-do-list",
                                icon: <UserOutlined />,
                                label: <Link to={"/to-do-list"}>To Do List</Link>,
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{
                        display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', padding: 0, background: colorBgContainer
                    }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Button style={{
                            fontSize: '16px',
                            marginRight: "10px"
                        }} onClick={logoutRequest}>Sign Out</Button>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
    );
};

export default App;