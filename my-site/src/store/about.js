import about from '@/http/about.js'
export default {
    namespaced: true,
    state: {
        isLoading: false,
        url: ''
    },
    mutations: {
        setIsLoading(state, payload){
            state.isLoading = payload
        },
        setData(state, payload){
            state.url = payload
        }
    },
    actions: {
        async getData(context){
            context.commit('setIsLoading', true);
            const result = await about();
            context.commit('setData', result);
            context.commit('setIsLoading', false);
        }
    }
}