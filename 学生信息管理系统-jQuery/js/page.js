//封闭作用域，节约内存资源
(function (){
    //创建构造函数
    function TurnPage(opations, _this){
        //存储传进来的变量
        this.total = opations.total || 1;//总页数
        this.current = opations.current || 1;//当前页
        this.changePage = opations.change || function (){}//处理函数
        this._this = _this;//调用此插件的dom对象
    }
     //自定义jQuery dom的实例方法
     $.fn.extend({
        turnPage : function (opations){
            var tp = new TurnPage(opations,this);
            tp.init();
        }
    })
    //初始化方法--为了节省资源，直接将方法定义在对象的原型链上
    TurnPage.prototype.init = function (){
        //创建翻页的结构，并且渲染页面
        this.createHtml();
        //翻页的功能
        this.bindEvent();
    }
    TurnPage.prototype.bindEvent = function (){
        var self = this;
        $(this._this).find('.page-prev').on('click',function (){
            self.current --;
            self.changePage(self.current);
        })
        $(this._this).find('.page-next').click(function (){
            self.current ++;
            self.changePage(self.current);
        })
        $(this._this).find('.pageList>.pageIndex').click(function (){
            self.current = Number($(this).text());
            self.changePage(self.current);
        })
    }
    TurnPage.prototype.createHtml = function (){
        var pageWrapper = $('<ul class="pageList"></ul>');
        if(this.current > 1){//如果当前页不是第一页，显示上一页按钮
            $('<li class="page-prev">上一页</li>').appendTo(pageWrapper);
        }
        //第一页一直显示，所以单独创建
        $('<li class="pageIndex">1</li>').appendTo(pageWrapper)
        .addClass(this.current == 1 ? 'nowPage' : '');
        //当前页前边有很多页的话，用省略号代替
        if(this.current - 2 - 1 > 1){
            $('<span>...</span>').appendTo(pageWrapper);
        }
        //两端的省略号中间一直显示5页,每个页码前后各显示两个
        for(var i = this.current - 2; i <= this.current + 2; i++){
            //如果当前页是第一页或者最后一页，只显示一边的两个页码，即如果i小于1或者大于最大页码的时候，不显示，反之显示相应的数字
            if(i > 1 && i < this.total){
                $('<li class="pageIndex"></li>')
                .text(i)
                .appendTo(pageWrapper)
                .addClass(this.current == i ? 'nowPage' : '');
            }
        }
        //当前页后边有很多页的话，用省略号代替
        if(this.total - (this.current + 2) > 1){
            $('<span>...</span>').appendTo(pageWrapper);
        }
        //最后一页要一直显示的
        $('<li class="pageIndex"></li>').text(this.total).appendTo(pageWrapper).addClass(this.current == this.total ? 'nowPage' : '');
        if(this.current < this.total){//如果不是最后一页，显示下一页按钮
            $('<li class="page-next">下一页</li>').appendTo(pageWrapper)
        }
        this._this.html(pageWrapper);//将创建的结构插入页面
    }
}())