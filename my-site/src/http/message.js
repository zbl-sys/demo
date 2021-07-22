import request from './interceptor';
// 提交留言
export  function postMessage(messageInfo){
    return request.post('/api/message', messageInfo).then(res => {
        return res;
    })
}

// 获取全部留言
export function getMessages(page = 1, limit = 10){
    return request.get('/api/message', {
        params: {
            page,
            limit
        }
    }).then(res => {
        return res;
    })
}