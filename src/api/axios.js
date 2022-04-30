import axios from "axios";


const int = axios.create({
    baseURL: "https://mallapi.duyiedu.com/goods/",
    params: {
        appkey: "xzl_1649404559951"
    }
})

int.interceptors.response.use((resp) => {
    return resp.data
})

export default int