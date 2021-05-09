//模拟数据
var mockData = Mock.mock({
    "data|65": [{
        "id": "@natural(10000, 99999)",
        "name": "@cname",
        "birth": "@date(yyyy)",
        "sex|1": [1, 0],
        "sNo": /^1\d{9}$/,
        "email": "@email(abc.com)",
        "phone": /^1[356789]\d{9}$/,
        "address": "@county(true)",
        "appkey": "@word(2, 5)_@date(T)",
        "ctime": "@date(T)",
        "utime": "@date(T)"
    }]
})
// 模拟学生列表信息的接口
Mock.mock(RegExp('studentList[\w\W]*'), 'get', function (opations) {
    // console.log(opations);
    var searchArr = opations.url.slice(opations.url.indexOf('?') + 1).split('&');//将参数分离出来
    var searchObj = {};
    var result = null; //存储要反回的数据
    //将分离出来的参数，拆分成key=value的格式，然后存进对象里
    for (var i = 0; i < searchArr.length; i++) {
        var key = searchArr[i].split('=')[0];
        var val = searchArr[i].split('=')[1];
        searchObj[key] = val;
    }
    // console.log(searchObj);
    result = mockData.data.filter(function (ele, index) {
        return index >= searchObj.size * (searchObj.page - 1) && index <= searchObj.size * searchObj.page - 1;
    })
    return {
        "data": {
            data: result,
            total: mockData.data.length
        },
        "status": "success",
        "msg": "查询成功"
    }
})

//模拟修改学生信息的接口
Mock.mock(RegExp('/updateStudent[\w\W]*'), 'get', function (opations) {
    //将参数分离出来
    var search = opations.url.slice(opations.url.indexOf('?') + 1);
    //对参数进行转码
    var searchCode = decodeURIComponent(search);
    //对转码过后的数据进行拆分
    var searchArr = searchCode.split('&');
    var searchObj = {};
    // console.log(searchArr);
    for(var i = 0; i < searchArr.length; i++){
        searchObj[searchArr[i].split('=')[0]] = searchArr[i].split('=')[1];
    }
    //修改数据
    for(var i = 0; i < mockData.data.length; i++){
        if(mockData.data[i].sNo === searchObj.sNo){
            for(var prop in searchObj){
                mockData.data[i][prop] = searchObj[prop];
            }
            break;
        }
    }
    return {
        "data": {
            result: mockData.data,
            total: mockData.data.length,
        },
        "status": "success",
        "msg": "修改成功"
    }
})
//模拟删除学生信息的接口
Mock.mock(RegExp('/delBysNo[\w\W]*'), 'get', function (opations) {
    var sno = opations.url.slice(opations.url.indexOf('?') + 1).split('=')[1];
    mockData.data = mockData.data.filter(function (ele, index) {
        return ele.sNo != sno;
    });
    return {
        "data": {
            result: mockData.data,
            total: mockData.data.length
        },
        "status": 'success',
        "msg": '删除成功'
    }
})
//模拟增加学生的接口
Mock.mock(RegExp('addStudent[\w\W]*'), 'get', function (opations) {
    console.log(opations);
    var searchArr = decodeURIComponent(opations.url.slice(opations.url.indexOf('?') + 1)).split('&');
    var searchObj = {};
    for (var i = 0; i < searchArr.length; i++) {
        searchObj[searchArr[i].split('=')[0]] = searchArr[i].split('=')[1];
    }
    //将新增学生的信息插入到数据中
    mockData.data.push(searchObj);
    // console.log(searchObj);
    return {
        "data": {
            result: mockData.data,
            total: mockData.data.length,
        },
        "status": "success",
        "msg": "新增成功"
    }
})
