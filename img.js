//刷新页面，等待一段时间，图片进入
let wrapLi = document.querySelectorAll('.wrap');
wrapLi.forEach(ele => {
    setTimeout(() => {
        ele.classList.remove('wrap');
    },300)
});

//点击列表的每一项，放大图片
let lis = document.querySelectorAll('li');
lis.forEach(ele => {
    ele.addEventListener('click', function(){
        this.parentNode.setAttribute('id', 'active');
        this.classList.add('active');
    })
})
//关闭按钮
let closeBtn = document.querySelectorAll('.close-btn');
closeBtn.forEach((ele, index) => {
    ele.addEventListener('click', function (e){
        //取消事件冒泡，防止点击触发父元素的点击事件
        e.stopPropagation();
        lis[index].parentNode.removeAttribute('id', 'active');
        lis[index].classList.remove('active');
    })
})