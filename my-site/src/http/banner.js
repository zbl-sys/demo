
import request from './interceptor';
export default async function getBanner(){
   return await request.get('/api/banner');
}
// getBanner().then(r =>{
//     console.log(r);
// });