export default function (val, selfVal = false) {
    const date = new Date(+val);
    let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (selfVal) {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        str += ` ${hour}:${minute}:${second}`
    }
    return str;
}