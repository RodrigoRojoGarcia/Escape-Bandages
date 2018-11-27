package es.sidelab.EscapeBandages;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class UsersController {
	
	//Guarda los usuarios relacionados con su contraseña, así no se puede repetir los usuarios
	private Map<String,String> userspasswords = new ConcurrentHashMap<>();
	//Guarda todos los usuarios, también identificados por su nombre. Existe para que el get de los usuario
	private static Map<String,User> users = new ConcurrentHashMap<>();
	//Guarda los lobbies que están activos en el servidor con un identificador sacado el atomicLong
	private static Map<Long, Lobby> lobbies = new ConcurrentHashMap<>();
	//Guarda todos los clientes conectados al servidor identificados por ids únicas calculadas en el juego
	private static Map<Long, Client> clients = new ConcurrentHashMap<>();
	//última id usada para los lobbies
	private AtomicLong lastId = new AtomicLong();
	
	
	//Devuelve todos los clientes conectados al servidor
	@GetMapping(value="clients")
	public static Collection<Client> clients(){
		return clients.values();
	}
	
	//Get para que no se desconecte el cliente. Resetea el tiempo de inactividad del mismo
	@GetMapping(value="clients/{id}")
	public ResponseEntity<Client> getClient(@PathVariable long id){
		Client client = clients.get(id);
		if(client != null) {
			client.resetInactivity();
			return new ResponseEntity<>(client, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Hacemos un post de un cliente nuevo, esto ocurrirá cuando se conecte un cliente.
	@PostMapping(value="clients/{id}")
	public ResponseEntity<Client> addClient(@PathVariable long id){
		Client client = new Client(id);
		clients.put(id, client);
		return new ResponseEntity<>(client, HttpStatus.OK);
	}
	//Eliminamos un cliente cuando se desconecta
	@DeleteMapping(value="/clients/{id}")
	public static void disconnectClient(@PathVariable long id) {
		if(clients.get(id).getUser()!=null)
		disconnectUser(clients.get(id).getUser().getUserName());
		clients.remove(id);
	}
	//Devuelve todos los usuarios registrados
	@GetMapping(value="users/")
	public static Collection<User> users(){
		return users.values();
	}
	/*
	 * Log in de usuarios.
	 * Si el usuario no existe se crea el usuario.
	 * Si la contraseña no es correcta se devuelve un error no válido.
	 * 
	*/
	@PostMapping(value="users/{id}/{userName}/{password}")
	public int newUser(@RequestBody Long id,@RequestBody String userName, @RequestBody String password) {
		//Si el cliente correspondiente a la id pasada por la url no existe
		if(clients.get(id)!=null) {
			//Si el hashmap de las constraseñas tiene ese userName, es decir, si tiene contraseña asociada
			if(userspasswords.containsKey(userName)) {
				//Si la contraseña introducida es igual a la contraseña del hashmap
				if(userspasswords.get(userName).equals(password)) {
					//Estado del user=ONLINE
					users.get(userName).setState("ONLINE");
					//Asociamos el user al cliente de la id
					clients.get(id).setUser(users.get(userName));
					//Devuelve 1, int que se usará en el juego como: contraseña y usuarios correctos
					return 1;
				}else {
					//Devuelve -1, int que se usará en el juego como: contraseña incorrecta
					return -1;
				}
			}else {//Si no existe el usuario introducido
				//Creamos un usuario con estado ONLINE y el nombre de usuario introducido
				User user = new User(userName,"ONLINE",false);
				//Lo metemos en el hashmap de usuarios
				users.put(userName, user);
				//Lo asociamos al cliente
				clients.get(id).setUser(user);
				//Lo metemos en el hashmap de usuarios-contraseñas
				userspasswords.put(userName, password);
				//Devuelve 0, int que se usará en el juego como: nuevo usuario registrado
				return 0;
			}
		}else {//Si el cliente no existe
			//Devuelve 2, int que se usará en el juego como: id de cliente no válida
			//Se supone que esto no debería ocurrir
			return 2;
		}
	}
	
	
	
	
	
	//Desconectar a un usuario
	@DeleteMapping(value="users/{userName}")
	public static void disconnectUser(@RequestBody String userName) {
		//Si existe
		if(users.get(userName)!=null) {
			//Cambiar su estado a OFFLINE
			users.get(userName).setState("OFFLINE");
		}
	}
	//Devuelve todos los lobbies
	@GetMapping(value="lobby/")
	public static Collection<Lobby> lobbies(){
		return lobbies.values();
	}
	//Crear lobby privado: significa que alguien que no introduce tu nombre de usuario no puede entrar
	@PostMapping(value="lobby/{user}")
	public Long newLobby(@RequestBody User user) {
		long id = lastId.incrementAndGet();
		Lobby lob = new Lobby(user,true);
		lobbies.put(id, lob);
		return id;
	}
	//Crear o unirte a un lobby aleatorio
	@PostMapping(value="lobby/{user}/")
	public Long newRandLobby(@RequestBody User user) {
	    //Por cada lobby que haya en el servidor
	    for(Long id : lobbies.keySet()) {
	    	//Si hay algún lobby con solo un usuario y no es privado
	    	if(!lobbies.get(id).isFull() && !lobbies.get(id).isPriv()) {
	    		//El usuario 2 es el usuario que ha pedido unirse
	    		lobbies.get(id).setUser2(user);
	    		//Decimos que se ha llenado
	    		lobbies.get(id).setFull(true);
	    		//Paramos la ejecución del post devolviendo el id del Lobby
	    		return id;
	    	}
	    }
	    //Si no, pues creo un nuevo lobby con user como user1
    	long id = lastId.incrementAndGet();
    	Lobby lob = new Lobby(user,false);
    	lobbies.put(id, lob);
    	return id;

	}
	
	
	@GetMapping(value="lobby/{id}/chat")
	public Collection chats(@RequestBody long id) {
		if(lobbies.get(id)!=null) {
			return lobbies.get(id).getDisplay();
		}else {
			return null;
		}
	}
	
	
	
	
	//Introducir un chat en un lobby en concreto
	@PutMapping(value="lobby/{id}/{userName}/{chat}")
	public ResponseEntity<Chat> newChat (@RequestBody long id, @RequestBody String userName, @RequestBody Chat chat) {
		//Si el lobby solicitado existe
		if(lobbies.get(id)!=null) {
			//Añadir el chat al lobby que se solicita
		lobbies.get(id).addChat(chat, userName);
		//Lo guardamos en el archivo (esto cambiará)
		chat.toFile();
		return new ResponseEntity<>(chat, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PutMapping(value="lobby/{id}/{userName}/{ready}")
	public ResponseEntity<User> userSetReady(@RequestBody long id, @RequestBody String userName, @RequestBody boolean ready){
		if(lobbies.get(id)!=null) {
			if(lobbies.get(id).getUser1().getUserName().equals(userName)) {
				lobbies.get(id).getUser1().setReady(ready);
				if(users.get(userName)!=null) {
					users.get(userName).setReady(ready);
					return new ResponseEntity<>(users.get(userName),HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}else if(lobbies.get(id).getUser2().getUserName().equals(userName)) {
				lobbies.get(id).getUser2().setReady(ready);
				if(users.get(userName)!=null) {
					users.get(userName).setReady(ready);
					return new ResponseEntity<>(users.get(userName),HttpStatus.OK);
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
	
	@PutMapping(value="lobby/{id}/{userName}/{character}")
	public ResponseEntity<User> userSetReady(@RequestBody long id, @RequestBody String userName, @RequestBody String character){
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
	
	@GetMapping(value="lobby/{id}/{userName}")
	public ResponseEntity<User> userFromLobby(@RequestBody long id, @RequestBody String userName){
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
	
	@GetMapping(value="lobby/{id}/{character}")
	public ResponseEntity<String> characterFromLobby(@RequestBody long id, @RequestBody String character){
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
	@DeleteMapping(value="lobby/{id}")
	public ResponseEntity<Lobby> removeLobby (@RequestBody long id){
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
