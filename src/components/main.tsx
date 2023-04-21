import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import StorageUtil from "~src/utils/storageUtil";
import type TrRecord from "~src/interfaces/TrRecord";
import './main.css'

const Main: React.FC = () => {

    const [dataSource, setDataSource] = useState<TrRecord[]>([]);

    useEffect(() => {
        StorageUtil.getRecords().then(e => {
            e.reverse();
            setDataSource(e);
        }).catch(e => {
            message.error(e.message).then();
        });
    }, []);

    return (
        <List
            // bordered
            dataSource={dataSource}
            renderItem={(item: TrRecord) => {

                let now = new Date(item.date);
                let nowStr = `${now.getFullYear() % 100}.${now.getMonth() + 1}.${now.getDate()}`;

                return (<List.Item>
                    <strong>{item.origin}</strong> : {item.target}
                    <span className={'right'}>{nowStr}</span>
                </List.Item>);
            }}
        />
    );
};

export default Main;
