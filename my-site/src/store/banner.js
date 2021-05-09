import getBanner from '@/http/banner'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: []
    },
    mutations: {
        setIsLoading(context, payload){
            context.isLoading = payload;
        },
        setData(context, payload){
            context.data = payload;
        }
    },
    actions: {
        async getData(context){
            // 如果有数据，则代表不用重新请求，直接用缓存
            if(context.state.data.length > 0){
                return;
            }
            context.commit('setIsLoading', true);
            const resp = await getBanner();
            context.commit('setData', resp);
            context.commit('setIsLoading', false);
        }
    }
}