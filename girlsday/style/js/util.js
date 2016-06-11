/**
 * Created by jingjing on 16/3/3
 */
(function () {
    "use strict";

    // Global defenition
    if (typeof App != "object") {
        window.App = {};
    }
    App.qUtil = {};
    
}());

$(function(){
   "use strict";
   App.qUtil={
        init:function(){
        },
        returnBack:function(){
            $(".header-left-arrow").click(function(e){
                window.history.go(-1);
                 App.qUtil.cancelBubbleAndDefault(e);
            });
        },
        //取消默认操作和冒泡
        cancelBubbleAndDefault:function(e){
            if(e && e.stopPropagation) {
            //　　//因此它支持W3C的stopPropagation()方法
            　　e.stopPropagation();
            } else {
            　　//否则，我们需要使用IE的方式来取消事件冒泡
            　　window.event.cancelBubble = true;
            }
            if(e && e.preventDefault) {
            　　//阻止默认浏览器动作(W3C)
            　　e.preventDefault();
            } else {
            　　//IE中阻止函数器默认动作的方式
            　　window.event.returnValue = false;
            }
            return false;
        },
        //左侧移入动画
        moveInToLeft:function(page){
            page.addClass("moveToLeft").removeClass("moveToRight");
        },
        //右侧移出动画
        moveOutToRight:function(page){
            page.addClass("moveToRight").removeClass("moveToLeft");
        },
        //hint对话框显示
        errorDialogShow:function(str){
            $(".error-dialog").fadeIn();
            $(".error-dialog div").html(str); 
            setTimeout(function(){
                $(".error-dialog").fadeOut();
            },3000);
        },
        //hint对话框消失
        errorDialogHide:function(dialog){
            dialog.click(function(e){
                dialog.fadeOut();
                App.qUtil.cancelBubbleAndDefault(e);
            });
            setTimeout(function(){
                dialog.fadeOut();
            },3000);
        },
        //提示框显示
        dialogShow:function(){
           for(var key in arguments){
                arguments[key].fadeIn();
           }
        },
        //提示框隐藏
        dialogHide:function(){
            for(var key in arguments){
                arguments[key].fadeOut();
           }
        },
        //去空格
        trimStr:function(str){
            return str.replace(/[ ]/g,"");
        }
   };

   $(function(){
        App.qUtil.init();
    });
}());