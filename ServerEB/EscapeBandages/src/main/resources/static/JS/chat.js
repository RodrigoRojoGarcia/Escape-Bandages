//Cargar chats del servidor
function loadChats(callback){
	$.ajax({
		url: 'http://'+location.host+'/chat/'
	}).done(function(chats){
		//console.log('Chats loaded: ' + JSON.stringify(chats));
		callback(chats);
	})
}

//Crear chat en el servidor
function createChat(chat, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+location.host+'/chat/',
		data: JSON.stringify(chat),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(chat){
		console.log("El usuario ha creado el chat" + JSON.stringify(chat));
		callback(chat);
	})
}

//Actualizar chat en el servidor
function updateChat(chat) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+location.host+'/chat/' + chat.id,
        data: JSON.stringify(chat),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (chat) {
        console.log("El usuario ha actualizado el chat: " + JSON.stringify(chat))
    })
}

//Borrar chat del servidor
function deleteChat(chatId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://'+location.host+'/chat/' + chatId
    }).done(function (chat) {
        console.log("Se ha borrado el chat " + chatId)
    })
}