import Mock from "mockjs";
Mock.mock('/api/globaldata', "get", function () {
 return  {
    code: 0,
    msg: "",
    data: [
      {
        url: "https://github.com/zbl-sys/demo",
        text: "github",
        type: "github",
        qrCodeUrl: "",
        id: 1,
      },
      {
        url: "mailto:17694812173@163.com",
        text: "17694812173@163.com",
        type: "mail",
        qrCodeUrl: "",
        id: 2,
      },
      {
        url:"tencent://message/?Menu=yes&uin=2314487926&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45",
        text: "2314487926",
        type: "qq",
        qrCodeUrl:"https://jiema.wwei.cn/uploads/2021/04/08/606eaa6e39526.jpg",
        id: 3,
      },
      {
        url: "weixin",
        text: "A2314487926",
        type: "weixin",
        qrCodeUrl:"https://jiema.wwei.cn/uploads/2021/04/08/606eab7a151de.jpg",
        id: 4,
      },
    ],
  }
});