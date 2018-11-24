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
	
	private Map<String,String> userspasswords = new ConcurrentHashMap<>();
	private static Map<String,User> users = new ConcurrentHashMap();
	private static Map<Long, Lobby> lobbies = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	@GetMapping(value="users/")
	public static Collection<User> users(){
		return users.values();
	}
	
	
	@GetMapping(value="users")
	
	
	
	
	/*
	 * Log in de usuarios.
	 * Si el usuario no existe se crea el usuario.
	 * Si la contraseña no es correcta se devuelve un error no válido.
	 * 
	*/
	@PostMapping(value="users/{userName}/{password}")
	public int newUser(@RequestBody String userName, @RequestBody String password) {
		if(userspasswords.containsKey(userName)) {
			if(userspasswords.get(userName).equals(password)) {
				users.get(userName).setState("ONLINE");
				return 1;
			}else {
				return -1;
			}
		}else {
			User user = new User(userName,"ONLINE",false);
			users.put(userName, user);
			userspasswords.put(userName, password);
			return 0;
		}
	}
	
	
	
	
	
	
	@DeleteMapping(value="users/{userName}")
	public static void disconnectUser(@RequestBody String userName) {
		if(users.get(userName)!=null) {
			users.get(userName).setState("OFFLINE");
		}
	}
		
	@GetMapping(value="lobby/")
	public static Collection<Lobby> lobbies(){
		return lobbies.values();
	}
	
	@PostMapping(value="lobby/{user}")
	public Long newLobby(@RequestBody User user) {
		long id = lastId.incrementAndGet();
		Lobby lob = new Lobby(user,true);
		lobbies.put(id, lob);
		return id;
	}
	
	@PostMapping(value="lobby/{user}/")
	public Long newRandLobby(@RequestBody User user) {
	    //Si hay algún lobby con solo un usuario
	    for(Long id : lobbies.keySet()) {
	    	if(!lobbies.get(id).isFull() && !lobbies.get(id).isPriv()) {
	    		lobbies.get(id).setUser2(user);
	    		lobbies.get(id).setFull(true);
	    		return id;
	    	}
	    }
	    //Si no, pues creo un nuevo lobby con user como user1
    	long id = lastId.incrementAndGet();
    	Lobby lob = new Lobby(user,false);
    	lobbies.put(id, lob);
    	return id;

	}
	
	
	@PutMapping(value="lobby/{id}/{chat}")
	public ResponseEntity<Chat> newChat (@RequestBody long id, @RequestBody Chat chat) {
		lobbies.get(id).addChat(chat);
		chat.toFile();
		return new ResponseEntity<>(chat, HttpStatus.OK);
	}
	
	
	@DeleteMapping(value="lobby/{id}")
	public ResponseEntity<Lobby> removeLobby (@RequestBody long id){
		Lobby lobby = lobbies.get(id);
		
		if(lobby!=null) {
			lobbies.remove(id);
			return new ResponseEntity<>(lobby,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
}
