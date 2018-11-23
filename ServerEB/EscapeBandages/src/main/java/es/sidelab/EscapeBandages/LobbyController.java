package es.sidelab.EscapeBandages;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/lobby")
public class LobbyController {
	
	private static Map<Long, Lobby> lobbies = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	
	
	@GetMapping(value="/")
	public static Collection<Lobby> lobbies(){
		return lobbies.values();
	}
	
	@PostMapping(value="/{user1}/{user2}")
	public Long newLobby(@RequestBody User user1, @RequestBody User user2) {
		long id = lastId.incrementAndGet();
		Lobby lob = new Lobby(user1, user2);
		lobbies.put(id, lob);
		return id;
	}
	
	
	@PutMapping(value="/{id}/{chat}")
	public ResponseEntity<Chat> newChat (@RequestBody long id, @RequestBody Chat chat) {
		lobbies.get(id).addChat(chat);
		chat.toFile();
		return new ResponseEntity<>(chat, HttpStatus.OK);
	}
	
	
	@DeleteMapping(value="/{id}")
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
