
function loadLobbies(callback){
	$.ajax({
		url: 'http://'+location.host+'/lobbies/'
	}).done(function(lobbies){
		callback(lobbies)
	})
}


function createLobbyWithTwoUsers(user1, user2){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/lobbies/'+
	})
}