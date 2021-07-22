import Mock from 'mockjs';
Mock.mock('/api/about', 'get', {
    "code": 0, // 错误码
    "msg": "", // 错误消息
    "data": " https://zbl-sys.github.io/demo/"
})