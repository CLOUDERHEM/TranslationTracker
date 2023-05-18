import React, { useEffect, useState } from "react";
import type TrRecord from "~src/interfaces/TrRecord";
import { Button, Card, message, Popconfirm, Table, Tag } from "antd";
import StorageUtil from "~src/utils/storageUtil";
import "antd/dist/reset.css";


const columns = [
    {
        title: "id",
        render: (text, record, index) => `${index + 1}`
    },
    {
        title: "objectId",
        dataIndex: "objectId",
        key: "objectId"
    },
    {
        title: "origin",
        dataIndex: "origin",
        key: "origin",
        render: (value) => {
            return <Tag color={"geekblue"}>
                {value}
            </Tag>;
        }
    },
    {
        title: "target",
        dataIndex: "target",
        key: "target",
        render: (value) => {
            return <Tag color={"green"}>
                {value}
            </Tag>;
        }
    },
    {
        title: "createdAt",
        dataIndex: "createdAt",
        key: "createdAt"
    },
    {
        title: "updatedAt",
        dataIndex: "updatedAt",
        key: "updatedAt"
    },
    {
        title: "manage",
        dataIndex: "manage",
        render: (value, trRecord, index) => (
            <Popconfirm
                title="Delete the trRecord"
                description="Are you sure to delete this trRecord?"
                onConfirm={() => {
                    deleteTrRecord(trRecord);
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button type={"link"}>
                    delete
                </Button>
            </Popconfirm>)
    }
];
let setTrRecords2: (value: (((prevState: TrRecord[]) => TrRecord[]) | TrRecord[])) => void;
let trRecords2: TrRecord[];
const deleteTrRecord = (e: TrRecord) => {
    StorageUtil.deleteRecord(e.objectId).then((res) => {
        message.success("Delete successfully").then();
        setTrRecords2(trRecords2.filter(item => {
            return e.objectId != item.objectId;
        }));
    });
};
const Manage: React.FC = () => {
    const [trRecords, setTrRecords] = useState<TrRecord[]>();
    setTrRecords2 = setTrRecords;
    trRecords2 = trRecords;

    useEffect(() => {
        StorageUtil.getRecords().then((e) => {
            e.reverse()
            setTrRecords(e);
        });
    }, []);

    return <Card title={"Translation History Manage"}>
        <Table columns={columns} dataSource={trRecords} />
    </Card>;
};
export default Manage;
