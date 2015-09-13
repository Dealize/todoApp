(function(){
    'use strict';
    angular.module('todoApp')
        .controller('todoListController',todoListController);

    todoListController.$inject = ['$scope','eventBus','todoDBFactory']
    function todoListController($scope,eventBus,todoDBFactory){
        var vm = this;
        var todoList = [];
        vm.todoList = todoList;
        vm.deleteTodo = deleteTodo;

        var promise = todoDBFactory.readAllData();
        promise.then(function(data){
            var getData = angular.copy(data);
            todoList = vm.todoList = getData.reverse();
        })

        eventBus.on('newTodoInfo',function(data){
            todoList.splice(0,0,data.data);
            createData(todoList);
        });

        function deleteTodo(index){
            todoList.splice(index,1);
            updateData(todoList);
        }

        function createData(data){
            //这样写因为是向第一个添加数据,更新时会让数据库中的每个内容都更新造成性能浪费,所以有必要进行数组反转
            //不对原数组进行复制,反转之后原数组的顺序也会发生变化
            //var newArr = todoList.reverse();
            var newArr = angular.copy(data).reverse();
            todoDBFactory.createData(newArr)
        }
        function updateData(data){
            var newArr = angular.copy(data).reverse();
            todoDBFactory.updateData(newArr);
        }
    }
})();