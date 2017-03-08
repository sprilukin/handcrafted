import Vuex from "vuex";
import Vue from "vue";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: {
            list: [],
            total: 0,
            loading: false
        }
    },
    mutations,
    actions
});