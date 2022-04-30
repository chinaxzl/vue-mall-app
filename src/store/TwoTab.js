import Vue from "vue"
import {
    getSidebar,
    getGoodsList
} from "@/api/sidebar"

export default {
    namespaced: true,
    state: {
        sidebar: [], //二级导航
        goodsList: [], //商品列表
        loading: true, //loading加载效果显示
        type: "",
        localstorageNum: {}, //存在localstorage中的数据
        finished: false,
    },

    mutations: {

        setlocalstorageNum(state, num) {
            state.localstorageNum = num;
        },
        setlocalStorage(state, {
            id,
            num,
            value
        }) {
            if (state.localstorageNum[id]) {
                if (num === -1 && state.localstorageNum[id] === 1 || value === -Infinity) {
                    Vue.delete(state.localstorageNum, id)
                } else {
                    Vue.set(state.localstorageNum, id, state.localstorageNum[id] + num)
                }
            } else {
                Vue.set(state.localstorageNum, id, 1)
            }
            localStorage.setItem("goods", JSON.stringify(state.localstorageNum))
        },
        setSidebar(state, type) { //二级导航
            state.sidebar = type;
        },
        setGoodsList(state, list) { //商品列表数据
            state.goodsList = [...state.goodsList, ...list.list]
        },
        setLoaidng(state, boolean) { //加载效果
            state.loading = boolean
        },
        removeGoodsList(state) { //初始化列表数据
            state.goodsList = [];
        },
        setGoodsListType(state, type) {
            state.type = type
        },
        setFinished(state, type) {
            state.finished = type
        }

    },

    actions: {
        async setSidebar(ctx, type) {
            ctx.commit("setLoaidng", false)
            const resp = await getSidebar(type);
            ctx.commit("setSidebar", resp);
            ctx.commit("setLoaidng", true)
        },

        async setGoodsList(ctx, obj) {
            const type = obj.type || ctx.state.type;
            const {
                page,
                size,
                sort
            } = obj;
            const resp = await getGoodsList(type, page, size, sort);
            ctx.commit("setGoodsList", resp);
            ctx.commit("setFinished", false)
            ctx.commit("setGoodsListType", type)
            if (resp.total > ctx.state.goodsList.length) {
                return true
            }
            return false

        },

        removeGoodsList(ctx) {
            ctx.commit("removeGoodsList")
        },


    }
}