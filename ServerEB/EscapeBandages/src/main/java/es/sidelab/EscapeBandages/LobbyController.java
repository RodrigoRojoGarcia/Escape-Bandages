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
	
	public static Map<Long, Lobby> getLobbies(){
		return lobbies;
	}
	
	public static void showDisconnected(String userName) {
		if(!lobbies.isEmpty()) {
			for(long id : lobbies.keySet()) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName) || lobbies.get(id).getUser2().getUserName().equals(userName)) {
					Chat chat = new Chat(userName+" se ha desconectado.","SERVER");
			    	lobbies.get(id).addChat(chat);
			    	
				}
			}
		}
		
	}
	
	
	
	
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
			Chat chat = new Chat(user.getUserName()+" se ha conectado.","SERVER");
	    	lobbies.get(id).addChat(chat);
			return id;
		}
		
		@PostMapping(value="/private/{userName}")
		public Long addToPrivLobby(@PathVariable String userName,@RequestBody User newUser) {
			for(Long id : lobbies.keySet()) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName) && !lobbies.get(id).isFull() && lobbies.get(id).isPriv()) {
					lobbies.get(id).setUser2(newUser);
					lobbies.get(id).setFull(true);
					
					Chat chat = new Chat(newUser.getUserName()+" se ha conectado.","SERVER");
			    	lobbies.get(id).addChat(chat);
					//Lobby found
			    	return id;
				}else if(lobbies.get(id).getUser2().getUserName().equals(userName) && !lobbies.get(id).isFull() && lobbies.get(id).isPriv()) {
					lobbies.get(id).setUser1(newUser);
					lobbies.get(id).setFull(true);
					
					Chat chat = new Chat(newUser.getUserName()+" se ha conectado.","SERVER");
			    	lobbies.get(id).addChat(chat);
			    	//Lobby found
					return id;
				}
			}
			return 0L;
		}
		
		
		//Crear o unirte a un lobby aleatorio
		@PostMapping(value="/random")
		public Long newRandLobby(@RequestBody User user) {
			//Por cada lobby que haya en el servidor
		    for(Long id : lobbies.keySet()) {
		    	if(!lobbies.get(id).isFull() && !lobbies.get(id).isPriv()) {
		    		if(lobbies.get(id).getUser1()!=null) {
		    			if(!lobbies.get(id).getUser1().getUserName().equals(user.getUserName())) {
		    				//El usuario 2 es el usuario que ha pedido unirse
				    		lobbies.get(id).setUser2(user);
				    		//Decimos que se ha llenado
				    		lobbies.get(id).setFull(true);
				    		//Paramos la ejecución del post devolviendo el id del Lobby
				    		
				    		Chat chat = new Chat(user.getUserName()+" se ha conectado.","SERVER");
					    	lobbies.get(id).addChat(chat);
				    		return id;
		    			}else {
		    				return 0L;
		    			}
		    		}else if(lobbies.get(id).getUser2()!=null){
		    			if(!lobbies.get(id).getUser2().getUserName().equals(user.getUserName())) {
		    				//El usuario 2 es el usuario que ha pedido unirse
				    		lobbies.get(id).setUser1(user);
				    		//Decimos que se ha llenado
				    		lobbies.get(id).setFull(true);
				    		//Paramos la ejecución del post devolviendo el id del Lobby
				    		
				    		Chat chat = new Chat(user.getUserName()+" se ha conectado.","SERVER");
					    	lobbies.get(id).addChat(chat);
				    		return id;
		    			}else {
		    				return 0L;
		    			}
		    		}else {
		    			return 0L;
		    		}
		    	}
		    }
		    //Si no, pues creo un nuevo lobby con user como user1
	    	long id = lastId.incrementAndGet();
	    	Lobby lob = new Lobby(user,false);
	    	lobbies.put(id, lob);
	    	Chat chat = new Chat(user.getUserName()+" se ha conectado.","SERVER");
	    	lobbies.get(id).addChat(chat);
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
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1()!=null) {
					if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
						//Añadir el chat al lobby que se solicita
						Chat chat = new Chat(sentence,userName);
						if(lobbies.get(id).getMummy().equals(userName)) {
							chat.setCharacter("Mummy");
						}
						if(lobbies.get(id).getPharaoh().equals(userName)) {
							chat.setCharacter("Pharaoh");
						}
						lobbies.get(id).addChat(chat);
					
					return new ResponseEntity<>(chat, HttpStatus.OK);
					}
				}
				if(lobbies.get(id).getUser2()!=null) {
					if(lobbies.get(id).getUser2().getUserName().equals(userName)) {
						//Añadir el chat al lobby que se solicita
						Chat chat = new Chat(sentence,userName);
						if(lobbies.get(id).getMummy().equals(userName)) {
							chat.setCharacter("Mummy");
						}
						if(lobbies.get(id).getPharaoh().equals(userName)) {
							chat.setCharacter("Pharaoh");
						}
						lobbies.get(id).addChat(chat);
					
					return new ResponseEntity<>(chat, HttpStatus.OK);
					}
				}
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
		
		@GetMapping(value="/bothReady/{id}")
		public boolean bothReady(@PathVariable long id) {
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).isFull()) {
					return lobbies.get(id).getUser1().getReady() && lobbies.get(id).getUser2().getReady();
				}else {
					return false;
				}
			}else {
				return false;
			}
		}
		
		@PutMapping(value="/{id}/{userName}/{character}")
		public ResponseEntity<String> userSetCharacter(@PathVariable long id, @PathVariable String userName, @PathVariable String character){
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1().getUserName().equals(userName) || lobbies.get(id).getUser2().getUserName().equals(userName)) {
					if(character.equalsIgnoreCase("mummy")) {
						if(lobbies.get(id).getMummy().equals("")){
							lobbies.get(id).setMummy(userName);
							if(lobbies.get(id).getPharaoh().equals(userName)) {
								lobbies.get(id).setPharaoh("");
							}
							return new ResponseEntity<>(lobbies.get(id).getMummy(), HttpStatus.OK);
						}
						return new ResponseEntity<>("",HttpStatus.OK);
					}else if(character.equalsIgnoreCase("pharaoh")) {
						if(lobbies.get(id).getPharaoh().equals("")){
							lobbies.get(id).setPharaoh(userName);
							if(lobbies.get(id).getMummy().equals(userName)) {
								lobbies.get(id).setMummy("");
							}
							return new ResponseEntity<>(lobbies.get(id).getPharaoh(), HttpStatus.OK);
						}
						return new ResponseEntity<>("",HttpStatus.OK);
					}else {
						return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
					}
				}else {
					return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
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
		
		@GetMapping(value="/userName/{id}/{userName}")
		public ResponseEntity<String> otherUser(@PathVariable long id, @PathVariable String userName){
			if(lobbies.get(id)!=null) {
				if(lobbies.get(id).getUser1()!=null) {
					if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
						if(lobbies.get(id).getUser2()!=null) {
							return new ResponseEntity<>(lobbies.get(id).getUser2().getUserName(),HttpStatus.OK);
						}else {
							return new ResponseEntity<>("",HttpStatus.OK);
						}
					}
				}
				
				if(lobbies.get(id).getUser2()!=null){
					if(lobbies.get(id).getUser2().getUserName().equals(userName)){
						if(lobbies.get(id).getUser1()!=null) {
							return new ResponseEntity<>(lobbies.get(id).getUser1().getUserName(),HttpStatus.OK);
						}else {
							return new ResponseEntity<>("",HttpStatus.OK);
						}
					}
					
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>("",HttpStatus.OK);
		}
		
		@GetMapping(value="/mummy/{id}")
		public ResponseEntity<String> getUserNameMummy(@PathVariable Long id) {
			if(lobbies.containsKey(id)) {
				
				if(lobbies.get(id).getMummy().equals("")) {
					return new ResponseEntity<>(lobbies.get(id).getMummy(), HttpStatus.OK);
				}else {
					if(lobbies.get(id).getUser1()!=null) {
						if(lobbies.get(id).getMummy().equals(lobbies.get(id).getUser1().getUserName())) {
							return new ResponseEntity<>(lobbies.get(id).getMummy(), HttpStatus.OK);
						}
					}
					if(lobbies.get(id).getUser2()!=null){
						if(lobbies.get(id).getMummy().equals(lobbies.get(id).getUser2().getUserName())) {
							return new ResponseEntity<>(lobbies.get(id).getMummy(), HttpStatus.OK);
						}
					}
				}
				
				return new ResponseEntity<>("",HttpStatus.INTERNAL_SERVER_ERROR);
				
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		@GetMapping(value="/pharaoh/{id}")
		public ResponseEntity<String> getUserNamePharaoh(@PathVariable Long id) {
			if(lobbies.containsKey(id)) {
				
				if(lobbies.get(id).getPharaoh().equals("")) {
					return new ResponseEntity<>(lobbies.get(id).getPharaoh(), HttpStatus.OK);
				}
				else{
					if(lobbies.get(id).getUser1()!=null) {
						if(lobbies.get(id).getPharaoh().equals(lobbies.get(id).getUser1().getUserName())) {
							return new ResponseEntity<>(lobbies.get(id).getPharaoh(), HttpStatus.OK);
						}
					}
					if(lobbies.get(id).getUser2()!=null){
						if(lobbies.get(id).getPharaoh().equals(lobbies.get(id).getUser2().getUserName())) {
							return new ResponseEntity<>(lobbies.get(id).getPharaoh(), HttpStatus.OK);
						}
					}
				}
				
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
				
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		@PutMapping(value="/{id}")
		public ResponseEntity<Long> returnToLobby(@PathVariable Long id) {
			if(lobbies.containsKey(id)) {
				if(lobbies.get(id).getUser1()!=null) {
					lobbies.get(id).getUser1().setReady(false);
				}
				if(lobbies.get(id).getUser2()!=null) {
					lobbies.get(id).getUser2().setReady(false);
				}
				lobbies.get(id).setMummy("");
				lobbies.get(id).setPharaoh("");
				return new ResponseEntity<>(id, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(id, HttpStatus.NOT_FOUND);
			}
			
		}
		
		
		
		
		//Eliminar un lobby
		@DeleteMapping(value="/{id}")
		public static ResponseEntity<Lobby> removeLobby (@PathVariable long id){
			
			//Si el lobby existe
			if(lobbies.get(id) != null) {
				//Lo quitamos
				lobbies.remove(id);
				return new ResponseEntity<>(lobbies.get(id),HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@DeleteMapping(value="/user/{id}/{userName}")
		public static ResponseEntity<User> removeUserFromLobby(@PathVariable long id, @PathVariable String userName){
			if(lobbies.containsKey(id)){
				if(lobbies.get(id).getUser1() != null){
					if(lobbies.get(id).getUser1().getUserName().equals(userName)){
						lobbies.get(id).setUser1(null);
						lobbies.get(id).setFull(false);
						if(lobbies.get(id).getMummy().equals(userName)){
							lobbies.get(id).setMummy("");
						}
						if(lobbies.get(id).getPharaoh().equals(userName)){
							lobbies.get(id).setPharaoh("");
						}
						if(lobbies.get(id).getUser2() == null){
							removeLobby(id);
						}
						return new ResponseEntity<>(UsersController.getUsers().get(userName),HttpStatus.OK);
					}
				}
				if(lobbies.get(id).getUser2() != null){
					if(lobbies.get(id).getUser2().getUserName().equals(userName)){
						lobbies.get(id).setUser2(null);
						lobbies.get(id).setFull(false);
						if(lobbies.get(id).getMummy().equals(userName)){
							lobbies.get(id).setMummy("");
						}
						if(lobbies.get(id).getPharaoh().equals(userName)){
							lobbies.get(id).setPharaoh("");
						}
						if(lobbies.get(id).getUser1() == null){
							removeLobby(id);
						}
						return new ResponseEntity<>(UsersController.getUsers().get(userName),HttpStatus.OK);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
			
			
}
