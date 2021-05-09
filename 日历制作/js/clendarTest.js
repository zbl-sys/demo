

moment.locale('zh-cn');//设置语言环境为中文环境
//设置日历顶部的实时时间
setInterval(function () {
    $('.time1').html(moment().format('HH:mm:ss'));
}, 1000)
$('.time2').html(moment().format('LL'));//设置日历顶部的实时的农历时间

//设置星期以适应不同的语言环境
var week = moment.weekdaysMin(true);//true代表按特定的语言环境返回工作日
var weekStr = week.reduce(function (pre, ele) {
    pre += '<span>' + ele + '</span>';
    return pre;
}, '')
$('.content-week').html(weekStr);

//鼠标移上的样式变化
$('.content-date').on('mouseover', 'li', function (e) {
    $(this).attr('id', 'mouseover');
    $(this).siblings().removeAttr('id');
})
$('.content-date').mouseleave(function () {
    $(this).children('li').removeAttr('id');
})
//获取相应月份对应的天数
function getDaysNum(m) {
    return m.daysInMonth();
}
//获取相应月份的第一天对应的星期数（这里取到的的是索引值）
function fisrtweek(m) {
    return m.startOf('month').weekday();
}
//生成日历
function readyDate(m) {
    //获取上个月的天数，即上个月最后一天，避免改变原moment对象，需要克隆
    var lastMonthDay = getDaysNum(m.clone().subtract(1, 'month'));
    //获取当前月的天数
    var thisMonthDay = getDaysNum(m);
    //获取当前月的第一天对应的星期的索引值
    var weekNum = fisrtweek(m.clone());
    var str = '';
    var nextMonthDay = 1;
    for (var i = 0; i < 42; i++) {
        if (i < weekNum) {
            str = '<li class="last-month">' +
                '<span>' + lastMonthDay + '</span>' +
                '<span>' + getOldDate(m.year(), m.month(), lastMonthDay) + '</span>' +
                '</li>' + str;
            lastMonthDay--;
        } else if (i >= weekNum && i < thisMonthDay + weekNum) {
            //当i=weeknum时，证明这个月第一天开始
            //修改当天的样式,判断传入的日期是否是今年当月当天
            var active = '';
            if (m.year() == moment().year() && m.month() == moment().month() && (i - weekNum + 1) == m.date()) {
                active = 'active';
            }
            str += '<li class = ' + active + '>' +
                '<span>' + (i - weekNum + 1) + '</span>' +
                '<span>' + getOldDate(m.year(), m.month() + 1, i - weekNum + 1) + '</span>' +
                '</li>';
        } else if (i >= thisMonthDay + weekNum) {
            str += '<li class="last-month">' +
                '<span>' + nextMonthDay + '</span>' +
                '<span>' + getOldDate(m.year(), m.month() + 2, nextMonthDay) + '</span>' +
                '</li>';
            nextMonthDay++;
        }
    }
    $('.content-date').html(str);
    $('.time3').html(m.format('YYYY年MMM'));
    $('.time4').html(m.format('YYYY年第WW周'))
}
readyDate(moment());

//上一个月下一个月按钮事件
var today = moment();
$('.up').click(function () {
    readyDate(today.subtract(1, 'month'));
})
$('.down').click(function () {
    readyDate(today.add(1, 'month'));
})


//获取相应的农历日期
function getOldDate(year, month, date) {
    //调用calendar.js的方法，求农历,最后返回对象
    var oldDate = window.calendar.solar2lunar(year, month, date);
    var result = '';
    if (oldDate.IDayCn == '初一') {	//如果是月初的话，换成这个月的名字
        result = oldDate.IMonthCn;
    } else if (oldDate.Term) {		//如果有节气的话，换成节气
        result = oldDate.Term;
    } else if (oldDate.festival) {	//如果有节日的话，换成节日
        result = oldDate.festival;
    } else if (oldDate.lunarFestival) {	//如果有中国传统的节日换成传统节日
        result = oldDate.lunarFestival;
    } else {
        result = oldDate.IDayCn;		//都没有的话就是正常显示
    }
    return result;
}