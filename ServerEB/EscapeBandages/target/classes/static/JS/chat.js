//Cargar chats del servidor
function loadChats(callback){
	$.ajax({
		url: 'http://localhost:8080/chat/'
	}).done(function(chats){
		console.log('Chats loaded: ' + JSON.stringify(chats));
		callback(chats);
	})
}

//Crear chat en el servidor
function createChat(chat, callback){
	$.ajax({
		method: "POST",
		url: 'http://localhost:8080/chat/',
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
function showChat(chat) {

    var checked = '';
    var style = '';

    if (chat.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + chat.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>'+ "[" + chat.user.character + "]" + chat.sentence +
        '</span> <button>Delete</button></div>')
}

$(document).ready(function () {

    loadChats(function (chats) {
        //When items are loaded from server
        for (var i = 0; i < chats.length; i++) {
            showItem(chats[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var chatDiv = elem.parent();
            var chatId = chatDiv.attr('id').split('-')[1];
            chatDiv.remove()
            deleteItem(chatId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var chatDiv = checkbox.parent();
        var textSpan = chatDiv.find('span');

        //Read item info from elements
        var chatDescription = textSpan.text();
        var chatChecked = checkbox.prop('checked');
        var chatId = chatDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedChat = {
            id: chatId,
            sentence: chatDescription,
            checked: chatChecked
        }

        //Update item in server
        updateChat(updatedChat);

        //Update page when checked
        var style = chatChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })
    //Nombre de usuario que se introduce al chat
    $("#add-button1").click(function(){
    	var value = input.val();
    	input.val('');

    	var user = {
    		character: value,
    		ready: false
    	}
    	var chat = {
    		id: 1,
    		user: user
    	}
    	updateChat(chat, function(chatWithId){
    		showChat(chatWithId);
    	});
    })

    //Handle add button
    $("#add-button2").click(function () {

        var value = input.val();
        input.val('');

        var chat = {
            sentence: value,
            checked: false
        }

        createChat(chat, function (chatWithId) {
            //When item with id is returned from server
            showChat(chatWithId);
        });
    })
})