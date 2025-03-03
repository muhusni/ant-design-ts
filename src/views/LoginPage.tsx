import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { FormProps } from 'antd';
import { Button, Form, Input, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../types/auth';

const onFinishFailed: FormProps<UserLogin>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const App: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const loginRequest = async (values: any) => {
        try {
            setLoading(true)
            await login(values);
            navigate("/")
        } finally {
            setLoading(false)
        }
    };

    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full screen height
            }}
        >
            <Card title="Login Page" style={{ width: 600 }}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={loginRequest}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<UserLogin>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<UserLogin>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item<UserLogin> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                    <Form.Item label={null} wrapperCol={{ span: 18, offset: 6 }}
                    >
                        <Button type="primary" loading={loading} htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
}


export default App;