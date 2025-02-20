import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "../views/HomePage"
import ToDoList from "../views/ToDoList"
import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
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
                        }}>Another Button</Button>
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
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/to-do-list" element={<ToDoList />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
    );
};

export default App;