//Cargar chats del servidor
function loadChats(callback){
	$.ajax({
		url: 'http://localhost:8080/chat'
	}).done(function(chats)){
		console.log('Chats loaded: ' + JSON.stringify(chats));
		callback(chats);
	}
}

//Crear chat en el servidor
function createChat(chat, callback){
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/chat',
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
        url: 'http://localhost:8080/chat/' + chat.id,
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
        url: 'http://localhost:8080/chat/' + chatId
    }).done(function (chat) {
        console.log("Se ha borrado el chat " + chatId)
    })
}

//Show item in page
function showItem(chat) {

    var checked = '';
    var style = '';

    if (chat.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + item.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + item.description +
        '</span> <button>Delete</button></div>')
}