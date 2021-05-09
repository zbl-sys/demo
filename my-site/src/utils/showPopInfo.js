import getComponentDom from './getComponentDom';
import Icon from '@/components/Icon/index';
import showStyles from '@/styles/showPopInfo.module.less';

//创建弹出的消息框
export default function (opations = {}) {
    const showText = opations.showText || 'Hello world';//显示的文本
    const showType = opations.showType || 'success';//类型
    const showTime = opations.showTime || 2000;//停留时间
    const container = opations.container || document.body;//容器元素或组件
    const callback = opations.callback || function (){};//回调函数
    const oDiv = document.createElement('div');
    const icon = getComponentDom(Icon, { type: showType });
    oDiv.innerHTML = `<span class="${showStyles.icon}">${icon.outerHTML}</span><div>${showText}</div>`;
    const bg = showStyles[`showPop-${showType}`];
    oDiv.className = `${showStyles.showPop} ${bg}`
    // 如果目标区域没有定位，则设置为相对定位
    if (Object.is(getComputedStyle(container, null)['position'], 'static')) {
        container.style.position = 'relative';
    }
    container.appendChild(oDiv);
    // 浏览器强行渲染,只要访问了需要计算的属性就会触发
    oDiv.offsetHeight; // 导致reflow
    // 从起始位置回到目标位置
    oDiv.classList.add(`${showStyles.show}`);
    // 显示一段时间之后，隐藏并删除元素，调用回调
    setTimeout(() => {
        oDiv.classList.add(`${showStyles.hide}`);
        oDiv.addEventListener('transitionend', () => {
            callback();
            oDiv.remove();
        }, { once:true })
    }, showTime);
}