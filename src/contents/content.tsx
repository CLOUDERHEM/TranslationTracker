import type { PlasmoContentScript } from "plasmo";
import $ from "jquery";
import { message } from "antd";
import StorageUtil from "~src/utils/storageUtil";
import type TrRecord from "~src/interfaces/TrRecord";
import Config from "~src/config";

const timeout = Config.waitTimeAfterTrans;

export const config: PlasmoContentScript = {
    matches: [
        "https://fanyi.baidu.com/*",
        "https://fanyi.youdao.com/*",
        "https://fanyi.qq.com/*",
        "https://cn.bing.com/translator/*"]
};
window.addEventListener("load", () => {
    let url = window.document.documentURI;
    if (url.indexOf(baiduExp) != -1) {
        baidu();
    } else if (url.indexOf(youdaoExp) != -1) {
        youdao();
    } else if (url.indexOf(tencentExp) != -1) {
        tencent();
    } else if (url.indexOf(bingExp) != -1) {
        bing();
    }
});


function addOne(origin, target) {
    if (origin === "" || origin === undefined || target === "" || target === undefined) {
        return;
    }
    if (origin.length > Config.maxWordLen) {
        return;
    }

    let data: TrRecord = {
        origin: origin.trim().toLowerCase(),
        target: target.trim().toLowerCase(),
        date: new Date().getTime()
    };

    StorageUtil.addRecords(data).then(() => {
        message.success(`已保存 ${origin}`).then();
    }).catch(e => {
        message.error(e.message).then();
    });
}

const baiduExp = "fanyi.baidu.com";

function baidu() {
    $("#baidu_translate_input").on("paste", () => {
        setTimeout(() => {
            let origin = $("#baidu_translate_input").val();
            let target = $(".target-output")[0].innerText;
            addOne(origin, target);
        }, timeout);
    });

}

const youdaoExp = "fanyi.youdao.com";

function youdao() {
    $("#inputOriginal").on("paste", () => {
        setTimeout(() => {
            let origin = $("#inputOriginal").val().toLowerCase();
            let target = $("#transTarget p span")[0].innerText;
            addOne(origin, target);
        }, timeout);
    });
}


const tencentExp = "fanyi.qq.com";

function tencent() {
    $("textarea").on("paste", () => {
        setTimeout(() => {
            let origin = $(".text-src")[0].innerText;
            let target = $(".text-dst")[0].innerText;
            addOne(origin, target);
        }, timeout);
    });
}

const bingExp = "cn.bing.com/translator";

function bing() {
    console.error("bing");
    $("#tta_input_ta").on("paste", () => {
        setTimeout(() => {
            let origin = $("#tta_input_ta").val();
            let target = $("#tta_output_ta").val();
            addOne(origin, target);
        }, timeout);
    });
}
