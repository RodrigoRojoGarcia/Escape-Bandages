//Cargar un usuario del servidor
function loadUsers(callback){
	$.ajax({
		url: 'http://'+location.host+'/users/'
	}).done(function(users){
		//console.log('Users loaded: '+ JSON.stringify(users))
		callback(users)
	})
}
//Crear usuario en el servidor
function createUser(user, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/users/'+user.id,
		data: JSON.stringify(user),
		processData: false,
		headers:{
			"Content-Type": "application/json"
		}
	}).done(function(user){
		console.log("User Created: "+JSON.stringify(user))
		callback(user)
	})
}

//Crear Cliente en el servidor
function postNewUser(client, userName, password, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/users/register/'+client.id + '/' + userName + '/' + password,
	}).done(function(errorCode){
		console.log("Code: "+errorCode)
		callback(errorCode)
	})
}

function logUser(client, userName, password, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/users/'+client.id + '/' + userName + '/' + password,
	}).done(function(errorCode){
		console.log("Code: "+errorCode)
		callback(errorCode)
	})
}


//data: JSON.stringify(user),
//processData: false,
//headers:{
//	"Content-Type": "application/json"
//}
















