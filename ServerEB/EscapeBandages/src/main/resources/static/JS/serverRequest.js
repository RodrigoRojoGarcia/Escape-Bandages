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
function createClient(client, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/clients/'+user.id + '/' + userName + '/' + password,
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

//CREAR LOBBY EN EL SERVIDOR
function createLobby(lobby, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/lobby/random',
		data: JSON.stringify(lobby),
		processData: false,
		headers:{
			"Content-Type": "application/json"
		}
	}).done(function(lobby){
		console.log("Lobby Created: "+JSON.stringify(lobby))
		callback(lobby);
	})
}

//Actualizar usuario en el servidor
function updateUserName(user,callback){
	$.ajax({
		method: 'PUT',
		url: 'http://'+location.host+'/users/'+user.id,
		data: JSON.stringify(user),
		processData:false,
		headers:{
			"Content-Type":"application/json"
		}
	}).done(function(user){
		if(user.id==-1){
			callback();
			
		}else{
			console.log("Update user: "+JSON.stringify(user))		
		}
	})
}

function updateUserCharacter(user){
	$.ajax({
		method: 'PUT',
		url: 'http://'+location.host+'/users/character/'+user.id,
		data: JSON.stringify(user),
		processData:false,
		headers:{
			"Content-Type":"application/json"
		}
	}).done(function(user){
		console.log("Update user: "+JSON.stringify(user))
	})
}


//Borrar usuario del servidor
function deleteUserName(userName,callback){
	$.ajax({
		method: 'DELETE',
		url: 'http://'+location.host+'/users/'+userName
	}).done(function(user){
		console.log("Delete userName "+userName)
		callback()
	})
}



//Mostrar el usuario en la página
function showUser(user){
	var ready = '';
	var style = '';
	
	if(user.ready){
		ready = 'ready';
		style = 'style="text-decoration:line-through"';
	}
	
	$('#info').append(
			'<div id="user-' +user.id+'"><input type="checkbox" '+ready+'><span '+style+'>'+
			user.character+'</span> <button>Delete</button></div>')
			
	
}

$(document).ready(function(){
	loadUsers(function(users){
		for(var i = 0; i < users.length; i++){
			showUser(users[i])
		}
	});
	
	var input = $('#value-input')
	var info = $('#info')
	
	
	//Botón de destrucción de usuarios
	info.click(function(event){
		var elem = $(event.target);
		if(elem.is('button')){
			var userDiv = elem.parent();
			var userId = userDiv.attr('id').split('-')[1];
			userDiv.remove();
			deleteUser(userId);
		}
	})
	
	//Manejo de las checkbox de los users
	info.change(function(event){
		//Get los elementos de la página de usuario
		var checkbox = $(event.target);
		var userDiv = checkbox.parent();
		var textSpan = userDiv.find('span');
		
		//Leer usuario info de elementos
		var userCharacter = textSpan.text();
		var userReady = checkbox.prop('checked');
		var userId = userDiv.attr('id').split('-')[1];
		
		//Crear el usuario actualizado
		var updatedUser = {
				id: userId,
				character: userCharacter,
				ready: userReady
		}
		
		//Actualizar usuario en el servidor
		updateUser(updatedUser);
		
		//Actualizar la página cuando se ponga listo
		var style = userReady ? 'line-through' : 'none';
		textSpan.css('text-decoration',style);
		
		
	})
	
	//Manejo añadir botón
	$("#add-button").click(function(){
		var value = input.val();
		input.val('');
		
		var user = {
			character: value,
			ready: false
		}
		
		createUser(user, function(userWithId){
			showUser(userWithId);
		})
	})
	
	
	
	
})























