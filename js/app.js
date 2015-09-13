angular
    .module('app',[])	
    .factory('cloudDB',cloudDB)
    .controller('newTodoController',newTodoController)
    .controller('todoListController',todoListController)

	var cloudDB;
  	(function(){
		  mui.plusReady(function () {
				if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
					mui.toast("当前网络不给力，无法连接云端数据库~");
			}else{
				network = true;
				cloudDB = new Wilddog("https://ngtodo.wilddogio.com/");
				}
			});
  	})()
  	cloudDB.$inject = ['$q'];
    function cloudDB($q){
        var service = {
            createData:createData,
            readAllData:readAllData,
            updateData:updateData
        };
        function updateData(data){
        	var createData =new Wilddog("https://ngtodo.wilddogio.com/todo");
            createData.set(data);
        }
        
        
        function createData(data){
        	var createData =new Wilddog("https://ngtodo.wilddogio.com/todo");
            createData.update(data);
        }
        
        function readAllData(){
        	var deferred = $q.defer();
        	var readAllData =new Wilddog("https://ngtodo.wilddogio.com/todo");
            readAllData.on('value',
                            function(snapshot){
                                deferred.resolve(snapshot.val());
                            },
                            function(errObj){
                              console.log('数据读取失败 ,error code :'+errObj.code)
                            });
            return deferred.promise;
        }
        return service;
        
    }
    

    newTodoController.$inject = ['$scope','cloudDB','$q'];
    function newTodoController($scope,cloudDB,$q){
    	var vm = this;
    	vm.newTodoSubmit = newTodoSubmit;
    	vm.data = {};
        vm.data.newTodoName = "";
        vm.data.newTodoState = "c";
        vm.errorInfo='none';
        var todoList = [];
       
        
	   var promise = cloudDB.readAllData();
       promise.then(function(data){
       	todoList = data;
      })
        
    	function newTodoSubmit(state,data){
    		data.newTodoState = state;
			 if(data.newTodoName!=''){
				 if(!todoList){
					 todoList = [];
				 }
				  promise = cloudDB.readAllData();
			       promise.then(function(data){
			       	todoList = data;
			      })
			      if(todoList.length==0){
			    	  todoList=[];
			      }
				 todoList.push(data);
				 cloudDB.createData(todoList);
				 mui.toast("添加成功,请在ToDoList进行下拉刷新.");
	         }else{
 				mui.toast('请输入ToDo Name');
	         }
			 promise = cloudDB.readAllData();
		     promise.then(function(data){
		       	todoList = data;
		     })
	         vm.data.newTodoName = "";
	         vm.data.newTodoState = "c";
    	}
    	
      
    }

    todoListController.$inject = ['$scope','cloudDB']
    function todoListController($scope,cloudDB){
        var vm = this;
        vm.s = 'aaa';
        vm.todoList = todoList;
        vm.deleteTodo = deleteTodo;
    	var todoList=[];
        var promise = cloudDB.readAllData();
        promise.then(function(data){
        	if(data){
        		var newArr = angular.copy(data).reverse();
        	}else{
        		var newArr = angular.copy(data); 
        	}
        	
        	todoList = vm.todoList = newArr;
       })
        function deleteTodo(index){
        	if(todoList.length==1){
        		todoList=[];
        	}else{
        		todoList.splice(index,1);
        	}
            cloudDB.updateData(todoList);
            mui.toast("清单完成,已经成功删除.");
        }

        mui.init({
			swipeBack: false,
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh
				},
			}
		});
		/**
		 * 下拉刷新具体业务实现
		 */
		function pulldownRefresh() {
			setTimeout(function() {
				var promise = cloudDB.readAllData();
		        promise.then(function(data){
		        	if(data){
		        		var newArr = angular.copy(data).reverse();
		        	}else{
		        		var newArr = angular.copy(data);
		        	}
		        	
		        	todoList = vm.todoList = newArr;
		       })
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		        mui.toast("刷新完成.");
			}, 500);
		}
		(function($) {
			var btnArray = ['否', '是'];
			//第二个demo，向左拖拽后显示操作图标，释放后自动触发的业务逻辑
			$('#OA_task_2').on('slideleft', '.mui-table-view-cell', function(event) {
				var elem = this;
				mui.confirm('是否已经完成？', '', btnArray, function(e) {
					if (e.index == 1) {
						elem.parentNode.removeChild(elem);
					}
				});
			});
			//第二个demo，向右拖拽后显示操作图标，释放后自动触发的业务逻辑
			$('#OA_task_2').on('slideright', '.mui-table-view-cell', function(event) {
				var elem = this;
				mui.confirm('是否已经完成？', '', btnArray, function(e) {
					if (e.index == 1) {
						deleteTodo(elem.getAttribute('value'));
						elem.parentNode.removeChild(elem);
					}
				});
			});
		})(mui);
    }


