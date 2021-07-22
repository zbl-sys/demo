import Mock from 'mockjs';

Mock.mock('/api/message', 'post', function(opations){
    const info = JSON.parse(opations.body);
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            "id": "@guid",
            nickname: info.nickname,
            content: info.content,
            createDate: Date.now(),
            "avatar|1": [
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
            ],
        },
    })
})
Mock.mock(/^\/api\/message(\?.+)?$/, 'get', function(opations){
    const limit = opations.url.split('?')[1].split('&')[1].split('=')[1];
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
          "total|50-200": 0,
          [`rows|${Number(limit) || 10}`]: [
            {
              "id": "@guid",
              nickname: "@cname",
              content: "@cparagraph(1, 10)",
              createDate: '@date("T")',
              "avatar|1": [
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
              ],
            },
          ],
        },
      });
})