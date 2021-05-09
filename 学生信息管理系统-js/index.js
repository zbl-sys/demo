//菜单栏变化，内容区对应变化处理函数
var menu = document.getElementsByClassName('menu')[0];
//事件委托
menu.onclick = function (e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    //切换菜单栏样式
    if(target.nodeName == 'DD'){
        var silbings = getSilbingsNode(target);
        target.className = 'active';
        for(var i = 0; i < silbings.length; i++){
            silbings[i].className = '';
        }
        //切换内容区的显示样式
        var id = target.getAttribute('data-id');
        var content = document.getElementById(id);
        content.classList.remove('add-student-active');
        var contentSilbings = getSilbingsNode(content);
        for(var j = 0; j < contentSilbings.length; j++){
            contentSilbings[j].classList.add('add-student-active');
        }
    }
}
//点击编辑按钮的样式切换
var upDate = document.querySelector('#student-table tbody');
var editPage = document.getElementsByClassName('edit-student')[0];
var editForm = document.getElementsByClassName('edit-student-info')[0];
upDate.onclick = function (e){
    var editBtnChildren = this.children;
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var index = 0;
    //获取点击按钮的行索引
    for(var i = 0; i < editBtnChildren.length; i++){
        if(target.parentNode.parentNode == editBtnChildren[i]){
            index = i;
            break;
        }
    }
    console.log(index);
    //如果点击的是编辑，就显示修改的页面
    if(target.className.indexOf('edit') != -1){
        editPage.classList.remove('edit-student-display');
         //编辑信息回填
        for(var prop in data1[index]){
            if(editForm[prop]){
                if(prop == 'sex'){
                    editForm[prop].value = data1[index][prop] == '男' ? '0' : '1';
                } else {
                    editForm[prop].value = data1[index][prop];
                }  
            }
        }
        //如果点击的是删除按钮，则删除信息
    } else if (target.className.indexOf('remove') != -1){
        requestFun('/api/student/delBySno',{sNo:data1[index]['sNo']},function (data){
            console.log(data);
            if(data.status == 'fail'){
                alert(data.msg);
            } else {
                alert('删除成功');
                getStudentInfo();
            }
        })
    }
}
//修改页面的提交事件
var editSubmitBtn = document.getElementById('edit-submitBtn');
editSubmitBtn.onclick = function (e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    //获取到修改表单里的内容
    var editData = getData(editForm);
    console.log(editData);
    //发送请求修改
    if(editData.status == 'fail'){
        alert(editData.msg);
    } else {
        requestFun('/api/student/updateStudent',editData.data,function(data){
            if(data.msg == 'fail'){
                alert(data.msg);
            } else {
                alert('修改成功');
                 //修改完后页面刷新数据列表并转到学生列表
                getStudentInfo();
                editPage.classList.add('edit-student-display');
            }
            console.log(data);
        })
    }
}
//添加学生
var submitBtn = document.getElementById('submitBtn');
submitBtn.onclick = function (e){
    e.preventDefault();
    var formData = getData(document.getElementsByClassName('insert-student-info')[0]);
    if(formData.status == 'fail'){
        alert(formData.msg);
    } else {
        //调用请求函数
        requestFun('/api/student/addStudent',formData.data,function (){
            alert('添加成功');
            var studentList = document.querySelector('dd[data-id="student-list"]');
            studentList.click();
            //执行查询学生信息函数
            getStudentInfo();
        })
        //后端不配合跨域，被阻塞了
        // $.ajax({
        //     url : 'http://open.duyiedu.com/api/student/addStudent',
        //     type : 'get',
        //     dataType : 'jsonp',
        //     data : dataStr,
        //     success : function (resInfo){
        //         console.log(resInfo);
        //         if(resInfo.status == 'success'){
        //             alert('添加成功');
        //             //添加成功之后自己执行，跳转到学生列表页面
        //             var studentList = document.querySelector('dd[data-id="student-list"]');
        //             studentList.click();
        //         } else {
        //             alert(resInfo.msg);
        //         }
        //     }
        // });
    }
}

//获取所有学生信息
var data1 = null;//接收查询到的学生信息
function getStudentInfo(){
    //调用请求函数
    requestFun('/api/student/findAll',{},function (data){
        //用请求到的数据渲染页面
        readyStudentTable(data.data);
        data1 = data.data;
    })
}
getStudentInfo();
//渲染学生列表页面
function readyStudentTable(data){
    var studentlistStr = data.reduce(function (prevValue,ele){
        prevValue += '<tr>'+
            '<td>' + ele.sNo + '</td>'+
            '<td>' + ele.name + '</td>'+
            '<td>' + (ele.sex = ele.sex ? '女' : '男') + '</td>'+
            '<td>' + ele.email + '</td>'+
            '<td>' + (new Date().getFullYear() - ele.birth) + '</td>'+
            '<td>' + ele.phone + '</td>'+
            '<td>' + ele.address + '</td>'+
            '<td>'+
                '<button class="btn edit">编辑</button>'+
                '<button class="btn remove">删除</button>'+
            '</td>'+
        '</tr>';
        return prevValue;
    },'')
    var tbody = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = studentlistStr;
}
//获取表单内容
function getData(form){
    //读取表单内容
    var name = form.name.value;
        sex = form.sex.value;
        email = form.email.value;
        sNo = form.sNo.value;
        birth = form.birth.value;
        phone = form.phone.value;
        address = form.address.value;
        //console.log(name,sex,email,sNo,birth,phone,address);
        //开始校验信息的完整性
        //所有输入的信息不能为控
        if(!name || !email || !sNo || !birth || !phone || !address){
            return {
                status : 'fail',
                msg : '请填写完整的学生信息'
            }
        }
        //邮箱格式判断
        var emailReg = /^[\w\.]+@[\w-]+\.com$/;
        if(!emailReg.test(email)){
            return {
                status : 'fail',
                msg : '邮箱格式不正确，请填写正确的邮箱'
            }
        }
        //sNo只能在4-16位之间的数字
        var snoReg = /^\d{4,16}$/;
        if(!snoReg.test(sNo)){
            return {
                status : 'fail',
                msg : '学号必须是4-16位的数字'
            }
        }
        //出生年份是1960-2005,且只能是4为数字
        var birthReg = /^\d{4}$/
        if(birth < 1960 || birth > 2005 || !birthReg.test(birth)){
            return {
                status : 'fail',
                msg : '出生年份是1960-2005,且只能是4位数字'
            }
        }
        //手机号只能是中国大陆的手机号
        var phoneReg = /^1[3-9]\d{9}$/;
        if(!phoneReg.test(phone)){
            return {
                status : 'fail',
                msg : '电话号只能是中国大陆的手机号'
            }
        }
        return {
            status : 'success',
            data : {
                name,
                sex,
                email,
                sNo,
                birth,
                phone,
                address
            }
        }
}
//jsonp格式请求资源
var $ = {
    ajax : function (resObj){
        //判断是否是jsonp格式
        if(resObj.dataType == 'jsonp'){
            //判断是否携带协议,如果携带了http或者https，可能会跨域
            if(resObj.url.indexOf('http') != -1 || resObj.url.indexOf('https') != -1){
                var url = new URL(resObj.url);
                //判断是否同源,如果协议或域名或端口不同即跨域
                if(url.protocol !== location.protocol || url.host != location.host){
                    //如果跨域，先创建一个script标签，将script的src作为请求接口
                    var script = document.createElement('script');
                    //随机生成一个函数名，将callback作为参数拼接在script标签的src后面
                    var callback = 'zbl' + parseInt(Math.random()*100);
                    if(url.href.indexOf('?') != -1){
                        script.src = url.href + '&' + resObj.data +'&callback=' + callback;
                    } else {
                        script.src = url.href + '?' + resObj.data+ '&callback=' + callback;
                    }
                    //浏览器会将收到的内容作为js代码执行
                    window[callback] = resObj.success;
                    document.body.appendChild(script);
                } else {
                    var xhr = null;
                    if(window.XMLHttpRequest){
                        xhr = new XMLHttpRequest();
                    } else {
                        xhr = ActiveXObject('Microsoft.XMLHttp');
                    }
                    xhr.open(resObj.type,resObj.url,true);
                    xhr.onreadystatechange = function (){
                        if(xhr.status == 200 && xhr.readyState == 4){
                            alert('请求成功');
                        }
                    }
                    xhr.send();
                }
            }else {//如果不携带协议，就是相对地址，即是同源
                var xhr = null;
                if(window.XMLHttpRequest){
                    xhr = new XMLHttpRequest();
                } else {//处理IE6兼容问题
                    xhr = new ActiveXObject('Microsoft.XMLHttp');
                }
                xhr.open(resObj.type,resObj.url,true);
                //监听状态改变
                xhr.onreadystatechange = function (){
                    //判断状态码和状态值
                    if(xhr.status == 200 && xhr.readyState == 4){
                        alert('请求成功');
                    }
                }
                xhr.send();
            }
        } 
    }
}
//ajax请求
function ajax(resObj) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resObj.success(JSON.parse(xhr.responseText));
        }
      }
    };
    resObj.type = resObj.type.toUpperCase();
    if (resObj.type == "GET") {
      xhr.open(resObj.type, resObj.newUrl + "?" + resObj.data, resObj.isAsync);
      xhr.send();
    } else if (resObj.type == "POST") {
      xhr.open(resObj.type, resObj.newUrl, resObj.isAsync);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(resObj.data);
    }
  }
//网络请求函数
function requestFun(url,data,callback){
    //判断传进来的数据的类型，进行拼接
     var dataStr = '';
    if(typeof(data) == 'object'){
       var newData = Object.assign({
            appkey : 'duyi20_zbl_1606745501195'
        },data);
    for(var prop in newData){
        //判断prop是否是data的直接属性
        if(newData.hasOwnProperty(prop)){
            dataStr += prop + '=' + newData[prop] + '&';
        }
    }
    } else {
        dataStr = data + '&appkey = duyi20_zbl_1606745501195';
    }
    //发送请求
    ajax({
        newUrl : 'http://open.duyiedu.com' + url,
        data : dataStr,
        type : 'get',
        success : function (resInfo){
            if(resInfo.status == 'success'){
                callback(resInfo);
            } else {
                alert(resInfo.msg);
            }
        },
        isAsync : true
    })
}
//获取当前节点的所有兄弟节点
function getSilbingsNode(node){
    var nodes = Array.prototype.slice.call(node.parentNode.children,0);
    return nodes.filter(function (element){
        return element != node;
    })
}
