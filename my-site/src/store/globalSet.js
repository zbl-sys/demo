import globalSet from '@/http/globalSet.js';
export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async getData(context) {
            if (context.state.data.length > 0) {
                return;
            }
            const resp = await globalSet();
            context.commit('setData', resp);
            // 添加网页图标
            let link = document.querySelector("link[ref='shortcut icon']");
            if (link) {
                return;
            }
            link = document.createElement("link");
            link.rel = "shortcut icon";
            link.type = "images/x-icon";
            link.href = 'https://img2.baidu.com/it/u=1407335370,4125449451&fm=26&fmt=auto&gp=0.jpg';
            document.querySelector("head").appendChild(link);
        }
    }
}