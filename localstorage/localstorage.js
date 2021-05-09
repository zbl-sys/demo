//请求数据
function resData(){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.open('get','./src/data/shoppingData.json',true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            //console.log(xhr.responseText);
            readyPage(JSON.parse(xhr.responseText));
            active();
        }
    }
    
}
resData();
//存储选中的商品数据
var selectedData = {};
//初始化方法,防止页面刷新，选中的商品重置
function init(){
    selectedData = JSON.parse(localStorage.getItem('shoppingdata')) ? JSON.parse(localStorage.getItem('shoppingdata')) : {};
    //每次刷新都要重新渲染购物车页面
    readyCheckPage();
}
init();
//渲染商品页面
function readyPage(arr){
    //console.log(arr);
    var str = '';
    arr.forEach(function (ele){
        var color = '';
        ele.list.forEach(function (col){
            color += '<span data-id="' + col.id + '">' + col.color + '</span>';
        })
        str += '<tr>'+
        '<td>'+
            '<img src="' + ele.list[0].img + '">'+
        '</td>'+
        '<td>'+
            '<p>' + ele.name + '</p>'+
            '<div class="color">'+
               color +
            '</div>'+
        '</td>'+
        '<td>' +ele.list[0].price+ '.00元</td>'+
        '<td>'+
            '<span class="sub">-</span><strong>0</strong><span class="add">+</span>'+
        '</td>'+
        '<td>'+
            '<button>加入购物车</button>'+
        '</td>'+
    '</tr>'
    })
    var tbody = document.getElementsByClassName('display')[0].getElementsByTagName('tbody')[0];
    tbody.innerHTML = str;
}
//添加行为
function active(){
    var tr = document.getElementsByClassName('display')[0].getElementsByTagName('tr');
    //循环每一行
    for(var i = 0; i < tr.length; i++){
        action(tr[i],i);
    }
    function action(dom,n){
        var color = dom.getElementsByClassName('color')[0];//全部颜色按钮
        var sub = dom.getElementsByClassName('sub')[0];//数量减按钮
        var add = dom.getElementsByClassName('add')[0];//数量加按钮
        var viewNum = dom.getElementsByTagName('strong')[0];//显示数量
        var shoppingBtn = dom.getElementsByTagName('button')[0];//加入购物车按钮
        var name = dom.getElementsByTagName('p')[0].innerHTML;//商品名称
        var price = parseFloat(dom.children[2].innerHTML);//商品价格
        var imgsrc = dom.children[0].children[0].getAttribute('src');//图片地址
        var img = dom.querySelector('img');
        var spanIndex = 0,//颜色按钮的下标
            checkColor = '',//选择的颜色
            colorId = '',//选择的颜色的编号
            selectedNum = 0;//商品数量
            colorBtn = ''//颜色按钮
            //事件委托，选择颜色
        color.onclick = function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            var silbings = getSilbings(target);
            //如果点击的目标上已经有这个类名了，就取消，如果没有就加身上
            target.className = target.className ? '' : 'active';
            //其他的按钮样式去掉
            for (var k = 0; k < silbings.length; k++) {
                silbings[k].className = '';
            }
            //找点击的颜色按钮的下标，为图片修改地址做准备
            for (var j = 0; j < this.children.length; j++) {
                if (target == this.children[j]) {
                    spanIndex = j;
                }
            }
            //根据选择的颜色修改显示图片地址
            imgsrc = target.className ? "src/img/img_0" + (n + 1) + "-" + (spanIndex + 1) + ".png" : "src/img/img_0" + (n + 1) + "-1.png";
            img.src = imgsrc;
            //存储选择的颜色、编号、选中的颜色的按钮
            checkColor = target.className ? target.innerText : '';
            colorId = target.className ? target.dataset.id : '';
            colorBtn = target;
        }
        //加减数量
        sub.onclick = function () {
            if (selectedNum == 0) {
                selectedNum = 0;
            } else {
                selectedNum--;
            }
            viewNum.innerText = selectedNum;
        }
        add.onclick = function () {
            selectedNum++;
            viewNum.innerText = selectedNum;
        }
        //加入购物车事件
        shoppingBtn.onclick = function (){
            var  oldSelectedNum = 0;//之前选择的数量
            if(!checkColor){
                alert('请选择商品颜色');
            } else if (!selectedNum){
                alert('请选择商品数量');
            } else {
                //判断已经存入的商品是否和目前选择的重复，如果重复，就加数量即可
                for(var prop in selectedData){
                    if(prop == colorId){
                        //如果有相同的商品，把之前存的数量赋值给计数的oldSelectedNum
                        oldSelectedNum = selectedData[prop].selectedNum;
                        break;
                    } else {
                        //如果之前没有选择过，将表示之前选择的数量的变量置0
                        oldSelectedNum = 0;
                    }
                }
                //将选中的商品信息存入对象
                selectedData[colorId] = {
                    "name" : name,
                    "shoppingID" : colorId,
                    "color" : checkColor,
                    "price" : price,
                    //将之前选的数量和当前选的数量加起来存入本地
                    "selectedNum" : selectedNum + oldSelectedNum,
                    "img" : imgsrc
                }
                //将商品信息存入本地
                localStorage.setItem('shoppingdata',JSON.stringify(selectedData));
                //加入购物车之后重置选择页面
                img.src = "src/img/img_0" + (n + 1) + "-1.png";
                colorBtn.className = '';
                viewNum.innerHTML = selectedNum = 0;
                //渲染购物车页面
                readyCheckPage();
            }
        }
    }
}
//渲染购物车页面
function readyCheckPage(){
    var addPrice = document.querySelector('.select thead strong');
    var tbody = document.getElementsByClassName('select')[0].children[1];
    //将本地存储的购物车信息存进数组
    var shoppingArr = [];
    var str = '';
    var result = 0;
    for(var prop in selectedData){
        shoppingArr.push(selectedData[prop]);
    }
    str = shoppingArr.map(function (ele){
        result += ele.price * ele.selectedNum;
        return '<tr>' +
        '<td>' +
            '<img src="' + ele.img + '" />' +
        '</td>' +
        '<td>' +
            '<p>' + ele.name + '</p>' +
        '</td>' +
        '<td>' + ele.color + '</td>' +
        '<td>' + (ele.price * ele.selectedNum) + '.00元</td>' +
        '<td>x' + ele.selectedNum + '</td>' +
        '<td><button data-id='+ ele.shoppingID +'>删除</button></td>' +
    '</tr>';
    }).join('');
    tbody.innerHTML = str;
    addPrice.innerHTML = result + '.00元';
    
    //购物车的删除功能
    var delBtn = document.querySelectorAll('.select tbody button');
    for(var i = 0; i <delBtn.length; i++){
        delBtn[i].onclick = function (){
            //获取删除的商品id
            var shoppingId = this.dataset.id;
            // 删除商品，删除对应的价格
            addPrice.innerHTML = parseInt(addPrice.innerHTML) - selectedData[shoppingId].price * selectedData[shoppingId].selectedNum;
            console.log(parseInt(addPrice.innerHTML));
            //删除商品对象中的数据
            delete selectedData[shoppingId];
            //重新更新本地存储
            localStorage.setItem('shoppingdata',JSON.stringify(selectedData));
            //删除dom
            this.parentNode.parentNode.remove();
        }
    }
    //清空购物车
    var delAll = document.querySelector('.select thead button');
    var tr = tbody.children;
    delAll.onclick = function (){
        localStorage.clear();
        for(var i = 0; i < tr.length; i++){
            tbody.removeChild(tr[i]);
        }
        init();
    }
    
}
//获取选中节点的兄弟节点
function getSilbings(node){
    var nodes = Array.prototype.slice.call(node.parentNode.children,0)
    return nodes.filter(function (ele){
        return ele != node;
    })
}