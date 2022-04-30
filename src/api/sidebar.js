import int from "./axios"

export async function getSidebar(type) {
    return await int.get("/getsidebar", {
        params: { //获取二级导航
            type
        }
    })
}


export async function getGoodsList(//获取商品列表
    type,
    page,
    size,
    sort
) {
    return await int.get("/getGoodsList", {
        params: {
            type,
            page,
            size,
            sort
        }
    })
}