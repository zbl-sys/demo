import request from './interceptor';

export default async function getGlobalData(){
    return await request.get('/api/globaldata');
}
