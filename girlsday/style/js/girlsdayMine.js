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
          var dialogBtn=$("#dialog-btn");
          var dialog=$(".dialog");
          var evalBtn=$("#eval-btn");
          var tabsList=$("#tabs-list");
          var tabItems=$(".tab-item");
          var mostTab=$("#most-tab");
          var tabText=$("#tab-text");
          var tabName=$("#tab-name");
          var friendsList=$("#friends-list");
          evalBtn.click(function(e){
            App.qUtil.dialogShow(dialog);
            App.qUtil.cancelBubbleAndDefault(e);
          });
          dialogBtn.click(function(e){
            App.qUtil.dialogHide(dialog);
            App.qUtil.cancelBubbleAndDefault(e);
          });
    /*获取标签处理*/
          //虚拟已获得的标签数据
          var tabs=[
              {tab:'女汉子',count:"2"},
              {tab:'萌妹子',count:30},
              {tab:'女神',count:"3"},
              {tab:'小家碧玉',count:"1"},
              {tab:'亭亭玉立',count:"1"},
              {tab:'女神经',count:1},
              {tab:'小家碧玉',count:"1"},
              {tab:'亭亭玉立',count:"1"},
              {tab:'飒爽英姿',count:1}
          ];
          var tabStyleClassNameArr=[
              "tab-item f40 pd-2 bg-light-blue",
              "tab-item f36 pd-3 bg-blue",
              "tab-item f30 pd-1 bg-light-pink",
              "tab-item f30 pd-4 bg-pink",
              "tab-item f40 pd-5 bg-light-pink",
              "tab-item f36 pd-6 bg-pink"
          ];
          //判断是否有评论过的标签
           // tabs.length=0;
          if(tabs.length==0){
              //清空tabslist所有标记内容
              tabsList.html='';
              //没有标签时候的设置
              tabName.css({"width":"100%","textAlign":"left"});
              tabText.css("display","none");
              mostTab.css("display","none");
              var html='<div class="none-tabs-hint f30">'+"还没有评价"+'</div>';
              tabsList.append($(html));
          }else{
              App.prize.showAlltabsIntoPage(tabs,tabsList,tabStyleClassNameArr);
          }
   /*获取标签处理*/
   /*获取好友列表处理*/
          var friendsAvatarUrl=[
              "style/img/content-bottom-icon.png",
              "style/img/content-bottom-icon.png",
              "style/img/content-top-icon.png",
              "style/img/content-bottom-icon.png",
              "style/img/content-top-icon.png",
              "style/img/content-top-icon.png",
              "style/img/content-top-icon.png",
          ];
            //判断是否有好友评价
            if(friendsAvatarUrl.length>0){
                App.prize.showAllFriendsIntoPage(friendsAvatarUrl,friendsList);
            }else{console.log("没有好友评价");}
   /*获取好友列表处理*/
        },
       //显示所有标签到页面 arguments=tab数组,tabList标签的父级元素
       showAlltabsIntoPage:function(tabs,tabsList,tabStyleClassNameArr){
           var maxCount=0;
           var maxTab="";
           tabsList.html='';
           //获取随机数
           var tscnLen=tabStyleClassNameArr.length;
           for(var i= 0,len=tabs.length;i<len;i++){
               var html="";
               //获取最多tab的内容
               var tabsCount=tabs[i].count;
               if(tabsCount>maxCount){
                   maxCount=tabsCount;
                   maxTab=tabs[i].tab;
               }
               if(tabsCount>1){
                   html='<div class="'+tabStyleClassNameArr[Math.floor(Math.random()*tscnLen)]+'">'+
                       '<span class="cm-tab-text">'+tabs[i].tab+'</span>'+
                       '<span class="tab-num">'+'x'+tabs[i].count+'</span>'+
                       '</div>';
               }else{
                   html='<div class="'+tabStyleClassNameArr[Math.floor(Math.random()*tscnLen)]+'">'+
                       '<span class="cm-tab-text">'+tabs[i].tab+'</span>'+
                       '<span class="tab-num"></span>'+
                       '</div>';
               }

               tabsList.append($(html));
           }
           //设置最多标签
           $("#most-tab").text(maxTab);
       },
       showAllFriendsIntoPage:function(friendsAvatarUrl,friendsList){
           var friendCount=$("#friend-count");
           friendsList.html="";
           for(var i= 0,len=friendsAvatarUrl.length;i<len;i++){
               var html='<div class="cba-avatar" style="background:url('+friendsAvatarUrl[i]+') no-repeat;background-size:contain;"></div>';
               friendsList.append($(html));
           }
           //设置共有好友评价人数
           friendCount.text(friendsAvatarUrl.length);
       },
   };
   $(function(){
        App.prize.init();
    });
}());