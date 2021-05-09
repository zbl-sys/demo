# my-site项目

## 安装依赖库
```
npm install
```

### 开发运行
```
npm run serve
```

### 生产打包
```
npm run build
```

### 单模块测试
```
npm run test:模块名
```

## Avatar组件
| 属性名 |  含义     |  类型    | 是否必填  |  默认值 |
| ---------| ---------- | --------- | ------------ | -------- |
|     url   | 图片地址|  String  |   是          |    无     |
|    title  | 图片说明 |  String  |  否          |    无     |
|   size   | 图片尺寸 |  Number|   否        |    50     |
## Icon组件
属性名：type,  指定图标的类型，字符串类型
| type |  含义     | 
| -----  | ---------  |
|home|   主页    |
|error|   错误    |
|close|   关闭    |
|warn|   警告    |
|info|   信息    |
|blog|   博客    |
|about|   关于    |
|weixin|   微信    |
|mail|   邮箱    |
|github|   git    |
|qq|   QQ    |
|arrowUp|   向上箭头    |
|arrowDown|   向下箭头    |



## Pager组件
| 属性名        | 含义       | 类型   | 必填 | 默认值 |
| ------------- | ---------- | ------ | ---- | ------ |
| current       | 当前页码   | Number | 否   | 1      |
| total         | 总数据量   | Number | 否   | 0      |
| limit         | 页容量     | Number | 否   | 10     |
| visibleNumber | 可见页码数 | Number | 否   | 10     |


| 事件名     | 含义     | 事件参数 | 参数类型 |
| ---------- | -------- | -------- | -------- |
| pageChange | 页码变化 | 新的页码 | Number   |
