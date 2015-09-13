/**
 * 控制器间的数据广播代码
 * 用于在不同控制器之间传输数据
 * @author: dongtao FromGithub
 * @time: 2015-08-20
 * @description : 先要在数据广播发布 和 接收的路由处 引入该文件
 *      数据发布的适合需要事件出发,调用fire
 *     数据接收时候调用on
 */
(function(){
    'use strict';
    angular
        .module('app')
        .factory('eventBus',eventBus);


    function eventBus(){
        console.log('eventBus is load ');
        var eventMap = {};

        var eventBus = {
            /**
             *获取广播
             * @param eventType 要监听的事件的索引
             * @param handler 索引对应的处理程序
             */
            on: function(eventType,handler){
                //如果json中没有这个索引对应的处理程序,则对该这个索引的数据进行初始化赋值
                if(!eventMap[eventType]){
                    eventMap[eventType] = [];
                }
                //将处理程序绑定到该索引对应的地方
                eventMap[eventType].push(handler);
            },
            /**
             * 解除广播
             * @param eventType
             * @param handler
             */
            off:function(eventType,handler){
                //查找该索引下的所有事件,如果有跟目标事件相同的事件,则将索引的这个事件进行删除
                for(var i=0;i<eventMap[eventType].length;i++){
                    if(eventMap[eventType][i]===handler){
                        eventMap[eventType].splice(1);
                        break;
                    }
                }
            },
            /**
             * 发布广播
             * @param event 广播的内容,应该为一个json格式,{type:XXX,data:XXX}
             */
            fire:function(event){
                //console.log(event);
                var eventType = event.type;;
                if(eventMap && eventMap[eventType]){
                    for(var i=0;i<eventMap[eventType].length;i++){
                        eventMap[eventType][i](event);
                    }
                }
            }
        }
        return eventBus;
    }


})();
