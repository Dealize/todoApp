(function(){
    'use strict';
    angular
        .module('todoApp')
        .factory('todoDBFactory',todoDBFactory);

    todoDBFactory.$inject = ['cloudDB','$http','$q']
    function todoDBFactory(cloudDB,$http,$q){
        var service = {
            createData:createData,
            readAllData:readAllData,
            updateData:updateData
        };
        return service;

        function createData(data){
            var createData = cloudDB.child('todo');
            createData.update(data);
        }

        function readAllData(){
            var deferred = $q.defer();
            var readAllData = cloudDB.child('todo');
            readAllData.on('value',
                            function(snapshot){
                                deferred.resolve(snapshot.val());
                            },
                            function(errObj){
                              console.log('���ݶ�ȡʧ�� ,error code :'+errObj.code)
                            });
            return deferred.promise;
        }


        //function readAllData(){
        //    var readAllData = cloudDB.child('todo');
        //    var data = '';
        //    readAllData.on('value',
        //                    function(snapshot){
        //                    console.log(snapshot.val());
        //                    //��ôд���õ�ʱ���ֲ�û��return��ȥ
        //                    //return snapshot.val();
        //                    data = snapshot.val();
        //                },
        //                    function (errorObj){
        //                    console.log('���ݶ�ȡʧ�� ,error code :'+errorObj.code)
        //                });
        //    return data;
        //}

        //function readAllData(){
        //    return $http({
        //        method:'GET',
        //        url:'https://ngtodo.wilddogio.com/todo'
        //    }).then(function(data){
        //        console.log(data);
        //        return data
        //    })
        //}

        function updateData(data){
            var updateData = cloudDB.child('todo');
            updateData.set(data);
        }
    }
})();