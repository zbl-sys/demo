import Vue from 'vue';
import VueRouter from 'vue-router';


import 'nprogress/nprogress.css';//进度条的第三方库，需要引入css
import { start, done, configure }  from 'nprogress'
configure({
    trickleSpeed: 100,//滚动条流动的速度，单位是毫秒
    showSpinner: false,//是否显示加载微调器
    trickleRate: 0.05//每次变化增加多少
})


Vue.use(VueRouter);

// 模拟请求数据的过程延迟
function dealy(duration) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve()
        }, duration);
    }))
}
// 加载过程的处理函数
function getCmp(cmpFun) {//这里不能直接将返回组件path传进来，要不然打包的时候影响分析依赖,
    // 也不能直接传入返回组件的promise,否则在一开始运行就会将所有的组件计算出来
    return async () => {
        start();//调用第三方库的方法
        // 正常情况下，process对象在浏览器中是没有的，但是vue-cli给全局挂载了。所以这里可以用
        if (process.env.NODE_ENV === 'development') {
            await dealy(1000)
        }
        const cmp = await cmpFun();
        done();
        return cmp;
    }
}
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: getCmp(() => import('./pagers/Home')),
        meta: { title: '首页' }
    },
    {
        path: '/blog',
        component: getCmp(() => import('./pagers/Blog/index')),
        meta: { title: '文章' }
    },
    {
        name: 'blogDetail',
        path: '/blog/:id',
        component: getCmp(() => import('./pagers/Blog/BlogDetail.vue')),
        meta: { title: '文章详情' }
    },
    {
        name: 'type',
        path: '/blog/type/:id',
        component: getCmp(() => import('./pagers/Blog/index'))
    },
    {
        path: '/about',
        component: getCmp(() => import('./pagers/About/index')),
        meta: { title: '关于我' }
    },
    {
        path: '/project',
        component: getCmp(() => import('./pagers/Project/index')),
        meta: { title: '效果展示' }
    },
    {
        path: '/message',
        component: getCmp(() => import('./pagers/Message/index')),
        meta: { title: '留言' }
    },
    {
        path: '*',//通配符，可以匹配到任何的路径
        component:getCmp(() => {
            return import('./components/NotFound')
        })
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    // 前端路由可以配置滚动行为，模拟刷新页面需要去到位置，或去到哪个锚点
    // scrollBehavior(to){
    //     // 返回值则为希望去到的位置
    //     if(to.hash){
    //         return {
    //             selector: to.hash,
    //         }
    //     }
    // }
})
router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = `小赵的个人空间-${to.meta.title}`
    }
})
export default router;