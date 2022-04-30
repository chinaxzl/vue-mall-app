import int from "./axios";

export async function getlikeSearch(value) {
    return await int.get("/likeSearch", {
        params: {
            likeValue: value
        }
    })
}


export async function getSearch(type, page, size) {
    return await int.get("/search", {
        params: {
            type,
            page,
            size
        }
    })
}