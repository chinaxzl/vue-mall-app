import int from "./axios";


export function getGoodsByIds(value) {
    return int.get("/getGoodsByIds", {
        params: {
            value
        }
    })
}