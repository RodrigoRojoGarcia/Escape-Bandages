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

function setCharacter (idLobby, userName, character){
	$.ajax({
		method:"PUT",
		url: 'http://'+location.host+'/lobby/'+idLobby+'/'+userName+'/'+character
	}).done(function(user){
		console.log("Character selected by: "+user.userName)
	})
}

function otherUser(idLobby, userName,callback){
	$.ajax({
		url:'http://'+location.host+'/lobby/userName/'+idLobby+'/'+userName
	}).done(function(userName){
		callback(userName)
	})
}








