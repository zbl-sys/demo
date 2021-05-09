import loadingImg from '@/assets/loading.svg';
import style from '@/styles/loading.module.less';
export function loading(el, binding) {
    if (binding.value) {
        if (!el.querySelector('img[data-loading=true]')) {
            const img = document.createElement("img");
            img.setAttribute('data-loading', true);
            img.src = loadingImg;
            img.title = '正在玩命加载中。。。';
            img.classList.add(style.loading)
            el.appendChild(img);
        }
    } else {
        const currentImg = el.querySelector('img[data-loading=true]');
        if (currentImg) {
            currentImg.remove();
        }
    }
}