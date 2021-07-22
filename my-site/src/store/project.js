import getProject from '@/http/project';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: []
    },
    mutations: {
        setLoading(state, payload){
            state.isLoading = payload
        },
        setData(state, payload){
            state.data = payload
        }
    },
    actions: {
        async getData(context){
            if (context.state.data.length > 0) {
                return;
            }
            context.commit('setLoading', true);
            const data = await getProject();
            context.commit('setData', data);
            context.commit('setLoading', false);
        } 
    }
}