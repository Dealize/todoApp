(
    function(){
        'use strict';
        angular.module('todoApp')
            .config(todoRouter);


        todoRouter.$inject = ['$stateProvider','$urlRouterProvider'];
        function todoRouter($stateProvider,$urlRouterProvider){
            $urlRouterProvider
                .otherwise('/');
            return $stateProvider
                .state('layout',{
                    url:'/',
                    resolve:{
                        deps:['$ocLazyLoad',function($ocLazyLoad){
                            return $ocLazyLoad.load([{
                                name:'todoApp',
                                files:[
                                    'app/commonService/eventBus.js',
                                    /*cloudSQLÎÄ¼þ*/
                                    'app/commonService/Widdog.js',

                                    'app/todo/todoDBFactory.js',

                                    'app/todo/newTodo/newTodoController.js',
                                    'app/todo/todoList/todoListController.js'
                                ]
                            }])
                        }]
                    },
                    views:{
                        "":{
                            templateUrl:'app/todo/main.html',
                        },
                        "newTodo@layout":{
                            templateUrl:'app/todo/newTodo/newTodo.html',
                            controller:'newTodoController',
                            controllerAs:'vm'
                        },
                        "todoList@layout":{
                            templateUrl:'app/todo/todoList/todoList.html',
                            controller:'todoListController',
                            controllerAs:'vm'
                        }
                    },

                })
        }
    }
)();