import request from './interceptor';

export default async function(){
    return await request.get('/api/project')
}