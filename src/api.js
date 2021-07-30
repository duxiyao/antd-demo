import axios from "axios";
import coreBus from "./event-bus"

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        let codeArr = [-1, 1, 1004, 1009];
        let errorTxt,
            codeObj = {
                "-1": "error",
                "1": "参数错误",
                "1004": "参数刺配",
                "1009": "获取信息失败",
            };

        errorTxt = codeObj[response.data.code] || "未知错误";

        if (codeArr.includes(response.data.code)) {
            coreBus.$emit("MiLive-UI:tips", {
                msg: errorTxt,
            });
        }

        return response;
    },
    (error) => {
        let errStatusArr = [400, 401, 403, 404, 405, 500],
            statusObj = {
                400: "错误请求",
                401: "验证失败",
                403: "拒绝访问",
                404: "活动未开始~",
                405: "请求方法不允许",
                500: "服务器错误",
            },
            errorStatusTxt;

        if (error && error.response) {
            if (errStatusArr.indexOf(error.response.status)) {
                errorStatusTxt = statusObj[error.response.status] || "网络错误";
                coreBus.$emit("MiLive-UI:tips", {
                    msg: errorStatusTxt,
                });
            }
        }
    }
);



export const test = async data => {
    let params = Object.assign({}, data, {
        // uuid,
        // actId: ACT_ID,
        // rankType: 0,
        // needGap:true,
        // needContribute:true,
        // needRegister:true,
        // levelName:"total",
        // needFollow:false,
        // rankName,
        // date: 0,
    });

    // let url = `${GET_ANCHOR_INFO}/${ACT_ID}/anchorInfo`;
    let url = `https://www.baidu.com/`;

    return await axios.get(url, {
        params
    }).then(function ({data}) {
        return data
    })

}