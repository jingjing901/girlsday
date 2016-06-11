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
    globalTabsArr:[],
    globalFriendsArr:[],
    currentTab:"",
    alreadyTabTag:false,
    init:function(){
      var dialogBtn=$("#dialog-btn");
      var dialog=$(".dialog");
      var evalBtn=$("#eval-btn");
      var tabBtn=$("#tab-btn");
      var tabsList=$("#tabs-list");
      var mostTab=$("#most-tab");
      var tabText=$("#tab-text");
      var tabName=$("#tab-name");
      var friendsList=$("#friends-list");
      var tabInputText=$("#tab-input-text");
      var defaultTabs=$(".cmdt-tab");
      //分享按钮
      evalBtn.click(function(e){
        App.qUtil.dialogShow(dialog);
        App.qUtil.cancelBubbleAndDefault(e);
      });
      //知道分享按钮
      dialogBtn.click(function(e){
        App.qUtil.dialogHide(dialog);
        App.qUtil.cancelBubbleAndDefault(e);
      });
      //点击预设标签
      defaultTabs.each(function(){
        $(this).click(function(e){
          App.prize.changeDefaultTabStatus($(this));
          App.qUtil.cancelBubbleAndDefault(e);
        });
      });
      //贴标签按钮
      tabBtn.click(function(e){
        if(!App.qUtil.trimStr(tabInputText.val())){
          App.qUtil.errorDialogShow("请输入评价标签");
          return false;
        }
        else{
          if(App.qUtil.trimStr(tabInputText.val()).length>4){
            App.qUtil.errorDialogShow("请输入少于4个字");
            return false;
          }
          /*******发送评价请求*********/
          var tabNameText=tabName.text();
          var currentTab=tabInputText.val();
          if(App.prize.alreadyTabTag){
            App.qUtil.errorDialogShow("您已评价过了");
          }else{
            App.prize.postTabFun(dialog,tabNameText,currentTab);
          }
        }

      });

      /******设置input中placeholder提示中的name*******/
        var name="被评价人的名字";
        if(name.length>3){
          name=name.slice(0,2)+"...";
        }
        tabInputText.attr("placeholder","请在4字以内描述对"+name+"的标签");
      /******设置input中placeholder提示中的name*******/
      /******获取标签处理*******/
      //虚拟已获得的标签数据
        var tabs=[
          {tab:'女汉子',count:2},
          {tab:'萌妹子',count:30},
          {tab:'女神',count:3},
          {tab:'小家碧玉',count:30},
          {tab:'亭亭玉立',count:5},
          {tab:'女神经',count:1},
          {tab:'大家闺秀',count:4},
          {tab:'萌萌的',count:5},
          {tab:'强女人',count:1},
          {tab:'彪悍',count:4},
          {tab:'温柔',count:5},
          {tab:'可爱',count:1}
        ];
        App.prize.globalTabsArr=tabs;
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
      /******获取标签处理*******/
      /******获取好友列表处理*******/
        var friendsAvatarUrl=[
          "style/img/content-bottom-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-bottom-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png",
          "style/img/content-top-icon.png"
        ];
        App.prize.globalFriendsArr=friendsAvatarUrl;
        //判断是否有好友评价
        if(friendsAvatarUrl.length>0){
          App.prize.showAllFriendsIntoPage(friendsAvatarUrl,friendsList);
        }else{console.log("没有好友评价");}
      /******获取好友列表处理*******/
    },
    //显示所有标签到页面 arguments=tab数组,所有标签的父级元素,标签样式的数组
    showAlltabsIntoPage:function(tabs,tabsList,tabStyleClassNameArr){
      var tabNameText=$("#tab-name").text();
      var maxCount=0;
      var maxTab="";
      tabsList.html("");
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

      //tab的点击提交贴标签请求
      $(".tab-item").each(function(){
        $(this).click(function(e){
          if(App.prize.alreadyTabTag){
            App.qUtil.errorDialogShow("您已评价过了");
          }else{
            App.prize.postTabFun($(".dialog"),tabNameText,$(this).find(".cm-tab-text").text())
            App.qUtil.cancelBubbleAndDefault(e);
          }
        });
      });
    },
    //显示所有好友到页面  arguments=friends头像img的地址，所有头像的父级元素
    showAllFriendsIntoPage:function(friendsAvatarUrl,friendsList){
      var friendCount=$("#friend-count");
      friendsList.html("");
      for(var i= 0,len=friendsAvatarUrl.length;i<len;i++){
        var html='<div class="cba-avatar" style="background:url('+friendsAvatarUrl[i]+') no-repeat;background-size:contain;"></div>';
        friendsList.append($(html));
      }
      //设置共有好友评价人数
      friendCount.text(friendsAvatarUrl.length);
    },
    //改变预设标签状态
    changeDefaultTabStatus:function(clickDefaultTab){
      var tabInputText=$("#tab-input-text");
      if(clickDefaultTab.hasClass("active")){
        clickDefaultTab.removeClass("active");
        tabInputText.val("");
      }
      else{
        clickDefaultTab.addClass("active");
        clickDefaultTab.siblings().removeClass("active");
        tabInputText.val(clickDefaultTab.text());
      }
    },
    //提交贴标签请求
    postTabFun:function(dialog,tabNameText,currentTab){
      var a=true;
      if(a==true){
        /******成功后*******/
        var changeHtml='<div class="dialog-eval-others">'+
            '<div class="deo-content">'+
            '<div class="deoc-title text-gray f30">您为<span class="text-black f36">'+tabNameText+'</span>贴的标签是</div>'+
            '<div class="deoc-tab text-dark-pink f50">'+currentTab+'</div>'+
            '</div>'+
            '<div class="deoc-btn f40" id="eval-sure-btn">确定</div>'+
            '</div>';
        App.prize.changeHtmlDialogShow(dialog,changeHtml);
        App.prize.currentTab=currentTab;
        /******成功后*******/
      }else{
        App.qUtil.dialogShow("失败的信息");
      }
    },
    //提示框显示
    changeHtmlDialogShow:function(dialog,changeHtml){
      dialog.fadeIn();
      dialog.html("");
      dialog.append($(changeHtml));
      //确认贴标签按钮
      $("#eval-sure-btn").click(function(e){
        dialog.fadeOut();
        var currentFriendAvatarUrl=$("#current-friend").val();
        var currentTabText=App.prize.currentTab;
        var tempTabsArr=App.prize.globalTabsArr;
        var tabStyleClassNameArr=[
          "tab-item f40 pd-2 bg-light-blue",
          "tab-item f36 pd-3 bg-blue",
          "tab-item f30 pd-1 bg-light-pink",
          "tab-item f30 pd-4 bg-pink",
          "tab-item f40 pd-5 bg-light-pink",
          "tab-item f36 pd-6 bg-pink"
        ];
        console.log("currenttab:",currentTabText);
        //更新tab数据
        var isExist=App.prize.tabIsExist(tempTabsArr,currentTabText);
        if(isExist==true){
          App.prize.globalTabsArr=tempTabsArr;
          App.prize.showAlltabsIntoPage(App.prize.globalTabsArr,$("#tabs-list"),tabStyleClassNameArr);
        }else{
          App.prize.globalTabsArr.unshift({tab:currentTabText,count:1});
          App.prize.showAlltabsIntoPage(App.prize.globalTabsArr,$("#tabs-list"),tabStyleClassNameArr);
        }
        //更新好友数据
        App.prize.globalFriendsArr.unshift(currentFriendAvatarUrl);
        App.prize.showAllFriendsIntoPage(App.prize.globalFriendsArr,$("#friends-list"));
        App.qUtil.cancelBubbleAndDefault(e);
        //显示已经评论过的内容
        $("#already-eval").fadeIn();
        $("#eval-name").text($("#tab-name").text());
        $("#eval-tab").text(currentTabText);
      });
    },
    //判断标签是否存在
    tabIsExist:function(tempTabsArr,currentTabText){
        for(var i= 0,len=tempTabsArr.length;i<len;i++){
            if(currentTabText==tempTabsArr[i].tab){
                tempTabsArr[i].count+=1;
                return true;
            }
        }
        return false;
    },
  };
  $(function(){
    App.prize.init();
  });
}());