package es.sidelab.EscapeBandages;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

	//Guarda los lobbies que están activos en el servidor con un identificador sacado el atomicLong
		private static Map<Long, Lobby> lobbies = new ConcurrentHashMap<>();
		
		//última id usada para los lobbies
		private AtomicLong lastId = new AtomicLong();
		
		
		//Devuelve todos los lobbies
		@GetMapping(value="/")
		public static Collection<Lobby> lobbies(){
			return lobbies.values();
		}
		//Crear lobby privado: significa que alguien que no introduce tu nombre de usuario no puede entrar
		@PostMapping(value="/private")
		public Long newLobby(@RequestBody User user) {
			long id = lastId.incrementAndGet();
			Lobby lob = new Lobby(user,true);
			lobbies.put(id, lob);
			return id;
		}
		
		@PostMapping(value="/private/{userName}")
		public Long addToPrivLobby(@PathVariable String userName,@RequestBody User newUser) {
			for(Long id : lobbies.keySet()) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName) && !lobbies.get(id).getUser1().getUserName().equals(newUser.getUserName())&& !lobbies.get(id).isFull() && lobbies.get(id).isPriv()) {
					lobbies.get(id).setUser2(newUser);
					lobbies.get(id).setFull(true);
					return id;
				}else if(lobbies.get(id).getUser2().getUserName().equals(userName) && !lobbies.get(id).getUser2().getUserName().equals(newUser.getUserName())&& !lobbies.get(id).isFull() && lobbies.get(id).isPriv()) {
					lobbies.get(id).setUser1(newUser);
					lobbies.get(id).setFull(true);
					return id;
				}
			}
			return (long) 0;
		}
		
		
		//Crear o unirte a un lobby aleatorio
		@PostMapping(value="/random")
		public Long newRandLobby(@RequestBody User user) {
		    //Por cada lobby que haya en el servidor
		    for(Long id : lobbies.keySet()) {
		    	//Si hay algún lobby con solo un usuario y no es privado
		    	if(!lobbies.get(id).isFull() && !lobbies.get(id).isPriv() && !lobbies.get(id).getUser1().getUserName().equals(user.getUserName())&&!lobbies.get(id).getUser2().getUserName().equals(user.getUserName())) {
		    		if(lobbies.get(id).getUser1()!= null && lobbies.get(id).getUser2() == null) {
			    		//El usuario 2 es el usuario que ha pedido unirse
			    		lobbies.get(id).setUser2(user);
			    		//Decimos que se ha llenado
			    		lobbies.get(id).setFull(true);
			    		//Paramos la ejecución del post devolviendo el id del Lobby
			    		return id;
		    		}else if(lobbies.get(id).getUser2() != null && lobbies.get(id).getUser1() == null) {
		    			//El usuario 1 es el usuario que ha pedido unirse
			    		lobbies.get(id).setUser1(user);
			    		//Decimos que se ha llenado
			    		lobbies.get(id).setFull(true);
			    		//Paramos la ejecución del post devolviendo el id del Lobby
			    		return id;
		    		}else {
		    			return (long)0;
		    		}
		    		
		    	}
		    }
		    //Si no, pues creo un nuevo lobby con user como user1
	    	long id = lastId.incrementAndGet();
	    	Lobby lob = new Lobby(user,false);
	    	lobbies.put(id, lob);
	    	return id;

		}
		
		
		@GetMapping(value="/{id}/chat")
		public Collection chats(@PathVariable long id) {
			if(lobbies.get(id)!=null) {
				return lobbies.get(id).getDisplay();
			}else {
				return null;
			}
		}
		
		
		//Introducir un chat en un lobby en concreto
		@PutMapping(value="/chat/{id}/{userName}/{sentence}")
		public ResponseEntity<Chat> newChat (@PathVariable long id, @PathVariable String userName, @PathVariable String sentence) {
			//Si el lobby solicitado existe
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName) || lobbies.get(id).getUser2().getUserName().equals(userName)) {
					//Añadir el chat al lobby que se solicita
					Chat chat = new Chat(sentence,userName);
					lobbies.get(id).addChat(chat);
					//Lo guardamos en el archivo (esto cambiará)
					chat.toFile();
					return new ResponseEntity<>(chat, HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@PutMapping(value="/ready/{id}/{userName}/{ready}")
		public ResponseEntity<User> userSetReady(@PathVariable long id, @PathVariable String userName, @PathVariable boolean ready){
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
					lobbies.get(id).getUser1().setReady(ready);
					if(UsersController.getUsers().get(userName)!=null) {
						UsersController.getUsers().get(userName).setReady(ready);
						return new ResponseEntity<>(UsersController.getUsers().get(userName),HttpStatus.OK);
					}else {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}else if(lobbies.get(id).getUser2().getUserName().equals(userName)) {
					lobbies.get(id).getUser2().setReady(ready);
					if(UsersController.getUsers().get(userName)!=null) {
						UsersController.getUsers().get(userName).setReady(ready);
						return new ResponseEntity<>(UsersController.getUsers().get(userName),HttpStatus.OK);
					}else {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@PutMapping(value="/{id}/{userName}/{character}")
		public ResponseEntity<User> userSetReady(@PathVariable long id, @PathVariable String userName, @PathVariable String character){
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
					if(character.equalsIgnoreCase("mummy")) {
						lobbies.get(id).setMummy(userName);
						return new ResponseEntity<>(lobbies.get(id).getUser1(),HttpStatus.OK);
					}else if(character.equalsIgnoreCase("pharaoh")) {
						lobbies.get(id).setPharaoh(userName);
						return new ResponseEntity<>(lobbies.get(id).getUser1(),HttpStatus.OK);
					}else {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}else if(lobbies.get(id).getUser2().getUserName().equals(userName)){
					if(character.equalsIgnoreCase("mummy")) {
						lobbies.get(id).setMummy(userName);
						return new ResponseEntity<>(lobbies.get(id).getUser2(),HttpStatus.OK);
					}else if(character.equalsIgnoreCase("pharaoh")) {
						lobbies.get(id).setPharaoh(userName);
						return new ResponseEntity<>(lobbies.get(id).getUser2(),HttpStatus.OK);
					}else {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@GetMapping(value="/user/{id}/{userName}")
		public ResponseEntity<User> userFromLobby(@PathVariable long id, @PathVariable String userName){
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
					return new ResponseEntity<>(lobbies.get(id).getUser1(),HttpStatus.OK);
				}else if(lobbies.get(id).getUser2().getUserName().equals(userName)) {
					return new ResponseEntity<>(lobbies.get(id).getUser2(),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@GetMapping(value="/character/{id}/{character}")
		public ResponseEntity<String> characterFromLobby(@PathVariable long id, @PathVariable String character){
			if(lobbies.get(id)!=null) {
				if(character.equalsIgnoreCase("mummy")) {
					return new ResponseEntity<>(lobbies.get(id).getMummy(),HttpStatus.OK);
				}else if(character.equalsIgnoreCase("pharaoh")) {
					return new ResponseEntity<>(lobbies.get(id).getPharaoh(),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		//Eliminar un lobby
		@DeleteMapping(value="/{id}")
		public ResponseEntity<Lobby> removeLobby (@PathVariable long id){
			Lobby lobby = lobbies.get(id);
			//Si el lobby existe
			if(lobby!=null) {
				//Lo quitamos
				lobbies.remove(id);
				return new ResponseEntity<>(lobby,HttpStatus.OK);
			}else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		}
		
		
		
	
}
