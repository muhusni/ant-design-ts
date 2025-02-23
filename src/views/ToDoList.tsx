import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Card } from 'antd';
import { ExclamationCircleFilled, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoList: React.FC = () => {
    const [listArray, setListArray] = useState<Array<string>>([]);
    const [toAdd, setToAdd] = useState<string>("")
    const [editData, setEditData] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToList = (): void => {
        if (toAdd === '') return
        setListArray((prev) => [...prev, toAdd])
        setToAdd("")
    }

    const { confirm } = Modal;

    const showConfirm = (index: number) => {
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                console.log(index, " is deleted");
                setListArray(listArray.filter((_, idx) => idx !== index))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showEditData = (index: number) => {
        setEditData(listArray[index]);
        setEditIndex(index)
        setIsModalOpen((prev) => !prev)
    };

    const handleEdit = () => {
        console.log(editIndex)
        setListArray((prevListArray) =>
            prevListArray.map((item, idx) => (idx === editIndex ? editData : item)) // Apply the updated editData
        );
        setIsModalOpen((prev) => !prev)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: "column" }}>
            <Form layout="inline" onFinish={addToList} >
                <Form.Item>
                    <Input
                        type="text"
                        value={toAdd}
                        onChange={(e) => setToAdd(e.target.value)}
                        placeholder="Enter item"
                        style={{ marginRight: '10px' }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                    >
                        ADD
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: "center" }}>
                {listArray.map((item, index) => (
                    <Card
                        key={index}
                        title={`Item ${index + 1}`}
                        style={{ width: 400 }}
                        actions={[
                            <EditOutlined key="edit" onClick={() => showEditData(index)} />,
                            <DeleteOutlined key="delete" onClick={() => showConfirm(index)} />]}
                    >
                        <p>{item}</p>
                    </Card>
                ))}
                <Modal title="Edit Data" open={isModalOpen} onOk={handleEdit} onCancel={() => setIsModalOpen((prev) => !prev)}>
                    <Input
                        value={editData}
                        onChange={(e) => setEditData(e.target.value)} // Update editData dynamically
                    />
                </Modal>
            </div>
        </div>
    );
};

export default ToDoList;
