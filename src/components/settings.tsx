import React from "react";
import { Button, Divider, message, Tooltip } from "antd";

import "./settings.css";
import StorageUtil from "~src/utils/storageUtil";

const Settings: React.FC = () => {

    let exportAll = () => {
        StorageUtil.exportAll("data.json").catch(e => {
            message.error(e.message).then();
        });
    };

    return (
        <div>
            <Tooltip placement="bottom" title={"save all as json file"}>
                <Button className={'btn'} onClick={exportAll}>
                    DOWNLOAD
                </Button>
            </Tooltip>

            <Divider/>

            <Button
                className={'btn'}
                onClick={() => {
                chrome.tabs.create({
                    url: "./tabs/manage.html"
                }).then();
            }}>
                MANAGE
            </Button>
        </div>
    );
};

export default Settings;
