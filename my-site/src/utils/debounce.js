export default function (fn, dealy = 50){
    let timer = null;
    return function (...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, dealy);
    }
}