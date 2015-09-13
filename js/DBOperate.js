function setData(name,data){
	var cloudDB = new Wilddog('https://ngtodo.wilddogio.com/');
	var createData = cloudDB.child(name);
    createData.update(data);
    alert('本地数据存储成功');
}


function getData(name){
	var eventBus = eventBus();
	var cloudDB = new Wilddog('https://ngtodo.wilddogio.com/');
	var readAllData = cloudDB.child('todo');
	readAllData.on('value',
	             function(snapshot){
					eventBus.fire('DBdata',snapshot.val());
					console.log('数据读取成功');
	             },
	             function(errObj){
	               console.log('数据读取失败 ,error code :'+errObj.code)
             });
}


