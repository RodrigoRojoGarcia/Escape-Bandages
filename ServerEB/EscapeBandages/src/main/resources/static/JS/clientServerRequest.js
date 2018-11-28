function postClient(id){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/clients/'+id
	}).done(function(data){
		console.log(data)
	})
}

function getUserFromClient(id,callback){
	$.ajax({
		url: 'http://'+location.host+'/clients/user/'+id
	}).done(function(data){
		callback(data)
	})
}