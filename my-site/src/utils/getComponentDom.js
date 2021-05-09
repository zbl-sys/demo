import Vue from 'vue'
// 根据插件获取插件的Dom元素，渲染一个组件之后，挂载完毕即可访问
export default function (comp, props){
    const vm = new Vue({
        render:(h) => h(comp,  { props} ),
    })
    vm.$mount();
    return vm.$el;
}