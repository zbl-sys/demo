import Vue from 'vue';
import Vuex from 'vuex'
import banner from './banner'
import globalSet from './globalSet'
import about from './about'
import project from './project'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        banner,
        globalSet,
        about,
        project
    }
})