import axios from "axios";
import coreBus from "./event-bus"

// let instance = axios.create({timeout: 1000 * 12});

//region 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        let codeArr = [-1, 1, 1004, 1009,];
        let errorTxt,
            codeObj = {
                "-1": "error",
                "1": "参数错误",
                "1004": "参数刺配",
                "1009": "获取信息失败",
            };

        errorTxt = codeObj[response.data.errorCode] || "未知错误";

        if (codeArr.includes(response.data.errorCode)) {
            console.log('axios:' + errorTxt)
            coreBus.$emit("error:tips", {
                msg: errorTxt,
            });
        }

        return response;
    },
    (error) => {
        let errStatusArr = [400, 401, 403, 404, 405, 500],
            statusObj = {
                400: "错误请求，参数",
                401: "验证失败",
                403: "拒绝访问",
                404: "404~",
                405: "请求方法不允许",
                500: "服务器错误",
            },
            errorStatusTxt;

        // console.log('--' + JSON.stringify(error.response))
        if (error && error.response) {
            if (errStatusArr.indexOf(error.response.status) > -1) {
                errorStatusTxt = statusObj[error.response.status] || "网络错误";
                coreBus.$emit("error:tips", {
                    msg: errorStatusTxt,
                });
                console.log('axios:' + errorStatusTxt)
            }
            return error.response;
        }
    }
);
//endregion

// const host = 'http://10.220.174.97:8081'
const host = ''

const allFiles = async data => {
    let params = Object.assign({}, data, {
        // uuid,
        // rankType: 0,
        // needGap:true,
        // rankName,
        // date: 0,
    });

    let url = `${host}/kv/allFiles`;

    return await axios.get(url, {
        params
    }).then(function ({data}) {
        return data
    })

}

const allKeys = async data => {
    let params = Object.assign({}, data, {
        // uuid,
        // needFollow:false,
        // rankName,
        // date: 0,
    });

    let url = `${host}/kv/allkeys`;

    return await axios.get(url, {
        params
    }).then(function ({data}) {
        return data
    })
}
const getContent = async data => {
    let params = Object.assign({}, data, {
        // uuid,
        // date: 0,
    });

    let url = `${host}/kv/content`;

    return await axios.get(url, {
        params
    }).then(function ({data}) {
        return data
    })
}

export default {
    allFiles,
    allKeys,
    getContent,
}