import request from './interceptor';
export default async function (){
    return await request('/api/about', { method: 'get' })
}