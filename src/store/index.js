import Vue from 'vue';
import Vuex from 'vuex';
import TwoTab from "./TwoTab";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        TwoTab,
    }
});


export default store;