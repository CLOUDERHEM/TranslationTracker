import type TrRecord from "~src/interfaces/TrRecord";

import { StorageApi } from "~src/utils/storageApi";

const StorageUtil = {

    addRecords: (data: TrRecord) => {
        return StorageApi.post(data);
    },

    getRecords: () => {
        return StorageApi.get();
    },

    exportAll: (filename: string) => {
        return new Promise((resolve, reject) => {
            StorageApi.get().then(res => {
                let data = JSON.stringify(res);
                const element = document.createElement("a");
                element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
                element.setAttribute("download", filename);
                element.style.display = "none";

                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);

                resolve(res);
            }).catch(e => {
                reject(e);
            });
        });
    }

};

export default StorageUtil;
