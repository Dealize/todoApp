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
            //����д��Ϊ�����һ���������,����ʱ�������ݿ��е�ÿ�����ݶ�������������˷�,�����б�Ҫ�������鷴ת
            //����ԭ������и���,��ת֮��ԭ�����˳��Ҳ�ᷢ���仯
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