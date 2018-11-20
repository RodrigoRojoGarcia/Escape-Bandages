//Cargar un usuario del servidor
function loadUsers(callback){
	$.ajax({
		url: 'http://localhost:8080/users/'
	}).done(function(items){
		console.log('Users loaded: '+ JSON.stringify(items))
		callback(items)
	})
}
//Crear usuario en el servidor
function createUser(user,callback){
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/users/',
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
//Actualizar usuario en el servidor
function updateUser(user){
	$.ajax({
		method: 'PUT',
		url: 'http://localhost:8080/users/'+user.id,
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
function deleteUser(userId){
	$.ajax({
		method: 'DELETE',
		url: 'http://localhost:8080/users/'+userId
	}).done(function(user){
		console.log("Delete user "+userId)
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
	
	$('#user').append(
			'<div id="user-' +user.id+'"><input type="checkbox" '+ready+'><span '+style+'>'+
			user.character+'</span> <button>Delete</button></div>')
			
	
}

$(document).ready(function(){
	loadUsers(function(users){
		for(var i = 0; i < users.length; i++){
			showUser(users[i])
		}
	});
	
	var input = $('#user-input')
	var info = $('#user')
	
	
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
	$("#add-button1").click(function(){
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