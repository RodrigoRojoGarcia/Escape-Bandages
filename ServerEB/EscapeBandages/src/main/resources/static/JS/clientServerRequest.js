function postClient(id, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/clients/'+id
	}).done(function(data){
		callback(data)
	})
}

function getUserFromClient(id,callback){
	$.ajax({
		url: 'http://'+location.host+'/clients/user/'+id
	}).done(function(data){
		callback(data)
	})
}