//CREAR LOBBY EN EL SERVIDOR
function createRLobby(user, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/lobby/random',
		data: JSON.stringify(user),
		processData: false,
		headers:{
			"Content-Type": "application/json"
		}
	}).done(function(lobby){
		console.log("Lobby Created: "+JSON.stringify(lobby))
		callback(lobby);
	})
}


function findPrivLobby(userName,user,callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/lobby/private/'+userName,
		data: JSON.stringify(user),
		processData: false,
		headers:{
			"Content-Type": "application/json"
		}
	}).done(function(lobby){
		console.log("Lobby found: "+lobby)
		callback(lobby)
	})
}

function createPLobby(user,callback){
	$.ajax({
		method:"POST",
		url: 'http://'+location.host+'/lobby/private/',
		data: JSON.stringify(user),
		processData: false,
		headers:{
			"Content-Type": "application/json"
		}
	}).done(function(lobby){
		console.log("Lobby Priv created: "+lobby)
		callback(lobby)
	})
}

function removeLobby(id){
	$.ajax({
		method: "DELETE",
		url: 'http://'+location.host+'/lobby/'+id,
	}).done(function(){
		console.log("Code: ")
	})
}