import React from "react";
import { Button, message, Tooltip } from "antd";

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
            <Tooltip placement="bottom" title={"save as a json file"}>
                <Button onClick={exportAll}>
                    <div className={"download-text"}>
                        Download all records
                    </div>
                </Button>
            </Tooltip>
        </div>
    );
};

export default Settings;
