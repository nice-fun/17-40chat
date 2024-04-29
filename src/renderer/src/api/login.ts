import request from "@utils/request";
export const login = (data) => {
    return request({
        url: "/api/summarizer/text",
        method: "post",
        data: data, // 请求体参数
    })
    
}