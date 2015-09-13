(function(){
    'use strict';
    angular.module('todoApp')
        .controller('newTodoController',newTodoController);

    newTodoController.$inject = ['$scope','eventBus'];
    function newTodoController($scope,eventBus){
        var vm = this;
        vm.data = {};
        vm.data.newTodoName = "";
        vm.data.newTodoState = "c";
        vm.errorInfo='none';
        vm.newTodoSubmit = newTodoSubmit;



        function newTodoSubmit(data){
            console.log(data);
            console.log(data.newTodoName);
            if(data.newTodoName!=''){
                vm.errorInfo='none';
                var postData = angular.copy(data);
                eventBus.fire({
                    type:'newTodoInfo',
                    data:postData
                })
            }else{
                vm.errorInfo = '';
            }

            vm.data.newTodoName = "";
            vm.data.newTodoState = "c";
        }
    }
}
)();