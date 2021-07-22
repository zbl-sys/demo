import axios from 'axios';
import { showPopInfo } from '@/utils'
axios.interceptors.response.use((response) => {
    // console.log(response);
    if(response.data.code === 0){
        return response.data.data;
    } else {
        showPopInfo({
            showText: response.data.msg || '不存在数据',
            showType: 'error'
        })
        return null;
    }
})

export default axios;