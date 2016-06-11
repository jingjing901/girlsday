/**
 * Created by jingjing on 16/3/6.
 */
(function () {
    "use strict";

    // Global defenition
    if (typeof App != "object") {
        window.App = {};
    }
    App.prize = {};
    
}());

$(function(){
   "use strict";
   App.prize={
        init:function(){
          /*iphone4匹配一屏更好显示*/
          var getPriceAva=$(".get-prize-avatar");
          if(window.innerHeight<=960){
            getPriceAva.css("marginBottom","7.6%");
          }
          /*iphone4匹配一屏更好显示*/
          var getPrizeClickBtn=$(".get-prize-click-btn");
          var getPrizeBtn=$("#get-prize-btn");
          var dialog=$(".dialog");
          var closeBtn=$(".dgp-close-btn");
          getPrizeClickBtn.click(function(e){
            dialog.fadeIn();
            App.qUtil.cancelBubbleAndDefault(e);
          });
          closeBtn.click(function(e){
            dialog.fadeOut();
            App.qUtil.cancelBubbleAndDefault(e);
          });
          getPrizeBtn.click(function(e){
            window.location.href="";//获取奖励的链接
            App.qUtil.cancelBubbleAndDefault(e);
          });
        }
   };
   $(function(){
        App.prize.init();
    });
}());