import request from './interceptor';
// 请求博客文章
export function getBlogData(opations = {}){
    const page = opations.page || 1;//当前页码
    const limit = opations.limit || 10;//每页容量
    const categoryid = opations.categoryid || -1;//所属的分类，-1代表全部
    return request.get('/api/blog',{
        params: {
            page,
            limit,
            categoryid,
          },
    }).then(res => {
        return res;
    })
}
// 获取博客的分类
export function getBlogType(){
    return request.get('/api/blogtype').then(res => {
        return res;
    })
}
// 根据博客的id获取单个博客文章的内容
export async function getBlogById(blogId){
    return await request.get(`/api/blog/${blogId}`);
}
// 提交评论, commentInfo中需要包含
// nickname: "昵称",
// 	content: "评论内容，纯文本",
// 	blogId: <id>	#评论的博客id
export async function addComment(commentIfo){
    return await request.post('/api/comment', commentIfo);
}
// 获取全部评论
export async function getComments(blogid, page = 1, limit = 10){
    return await request.get('/api/comment', {
        params: {
            page,
            limit,
            blogid
        }
    })
}