//切换相关样式
function bindEvent() {
    $('.content .aside .nav').on('click', 'dd', function () {
        // 菜单栏切换样式
        $(this).addClass('active').siblings('dd').removeClass('active');
        //根据菜单栏的选项切换右边内容的样式
        $('.' + $(this).data('id')).fadeIn().siblings().fadeOut();
    });
    //显示编辑表单-数据回填
    $('#stu-body').on('click', '.edit', function () {
        $('.edit-student').slideDown();
        var index = $(this).parents('tr').index();
        // console.log(index);
        readyEditData(stuData[index]);
    })
    //点击遮罩层隐藏
    $('.edit-student').click(function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target == this) {
            $(this).slideUp();
        }
    })
    //提交数据并且隐藏编辑表单，显示学生列表
    $('#edit-submitBtn').click(function (e) {
        e.preventDefault();
        var formData = getFormData($('.edit-student-info'));
        if (formData.status == 'success') {
            requestFun({
                url: '/updateStudent',
                data : formData.data,
                callback: function (res) {
                    resData();
                    alert(res.msg);
                    $('.edit-student').slideUp();
                }
            });
        } else {
            alert(formData.msg);
        }
    })
    //删除学生
    $('#stu-body').on('click', '.remove', function (e) {
        var removeIndex = $(this).parent().parent().index();
        var confirm = window.confirm('确认删除名为  ' + stuData[removeIndex].name + '  学号为  ' + stuData[removeIndex].sNo + '  的学生吗？');
        if (confirm) {
            requestFun({
                url: '/delBysNo',
                data : {
                    sno : stuData[removeIndex].sNo,
                },
                callback: function (res) {
                    alert(res.msg);
                    resData();
                }
            })
        }
    })
    //添加学生
    $('#submitBtn').on('click', function (e) {
        e.preventDefault();
        var addInfo = getFormData($('.insert-student-info'));
        // console.log(addInfo);
        if (addInfo.status == 'success') {
            requestFun({
                url: '/addStudent',
                data: addInfo.data,
                callback: function (res) {
                    alert(res.msg);
                    resData();
                    $('.nav>dd:first-of-type').trigger('click');
                }
            })
        } else {
            alert(addInfo.msg);
        }
    })
}
bindEvent();
//用于请求的方法
function requestFun(opations) {
    $.ajax({
        url: opations.url,
        type: 'get',
        data: opations.data,
        dataType: 'json',
        success: function (res) {
            if (res.status == 'success') {
                opations.callback(res);
            } else {
                alert(res.msg);
            }
        }
    })
}
//获取表单数据
function getFormData(dom) {
    var stuInfoArr = dom.serializeArray();
    var result = null;
    for (var i = 0; i < stuInfoArr.length; i++) {
        //判断学生信息是否为空
        if (!stuInfoArr[i].value) {
            return result = {
                status: 'fail',
                msg: '所填信息不能为空！',
            }
        }
    }
    //判断邮箱格式
    var emailReg = /^[\w\.]+@[\w-]+\.com$/;
    // /^[\w\.]+@[\w-]+\.com$/
    if (!emailReg.test(stuInfoArr[2].value)) {
        return result = {
            status: 'fail',
            msg: '请填写正确的邮箱地址',
        }
    }
    //判断学号的位数以及类型是否满足
    var snoReg = /^\d{4,16}$/;
    if (!snoReg.test(stuInfoArr[3].value)) {
        return result = {
            status: 'fail',
            msg: '学号只能是4-16位数字',
        }
    }
    //出生年份只能是四位数字
    var bitrthReg = /^\d{4}$/;
    if (!stuInfoArr[4].value.match(bitrthReg)) {
        return result = {
            status: 'fail',
            msg: '出生年只能是四位数字',
        }
    }
    //判断电话号码
    var phoneReg = /^1[356789]\d{9}$/;
    if (!phoneReg.test(stuInfoArr[5].value)) {
        return result = {
            status: 'fail',
            msg: '电话号只能是中国大陆的手机号',
        }
    }
    return result = {
        status: 'success',
        data: stuInfoArr,
    }
}
//表单数据回填
function readyEditData(data) {
    var editForm = $('.edit-student-info').get(0);
    for (var prop in data) {
        if (editForm[prop] != undefined) {
            editForm[prop].value = data[prop]
        }
    }
}
var stuData = [];//保存请求到的数据
var nowPage = 1;//当前页
var dataSize = 10;//每页显示的数量
var total = 0;//总页数
//请求数据
function resData() {
    requestFun({
        url: '/studentList',
        data : {
            page : nowPage, //页数
            size : dataSize, //每页显示的数量
        },
        callback: function (res) {
            // console.log(res);
            stuData = res.data.data;
            total = Math.ceil(res.data.total / dataSize);
            readyDom(res.data.data);
        }
    })
}
resData();
//渲染页面
function readyDom(data) {
    var str = data.map(function (ele, index, self) {
        return `<tr>
        <td>${index+1}</td>
        <td>${ele.sNo}</td>
        <td>${ele.name}</td>
        <td>${ele.sex == 0 ? '男' : '女'}</td>
        <td>${ele.email}</td>
        <td>${new Date().getFullYear() - ele.birth}</td>
        <td>${ele.phone}</td>
        <td>${ele.address}</td>
        <td>
            <button class="btn edit">编辑</button>
            <button class="btn remove">删除</button>
        </td>
    </tr>`
    }).join('');
    // console.log(str);
    $('.student-table>tbody').html(str);
    //渲染页面的时候，更改页码
    $('.page').turnPage({
        //将总页数和当前页传进去用来渲染页码
        total : total,
        current : nowPage,
        change : function (current){
            nowPage = current;
            resData();
        }
    });
}