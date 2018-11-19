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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/chat")
public class ChatController {
	
	private Map<Long, Chat> chats = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	
		@GetMapping(value="/")
		public Collection<Chat>chats() {
			return chats.values();
		}
		
		@PostMapping(value="/")
		@ResponseStatus(HttpStatus.CREATED)
		public Chat newChat(@RequestBody Chat chat) {
			long id = lastId.incrementAndGet();
			chat.setId(id);
			chats.put(id, chat);
			
			return chat;
		}
		
		
		@PutMapping(value="/{id}")
		public ResponseEntity<Chat> updateChat(@PathVariable long id, @RequestBody Chat updatedChat){
		
			Chat chat = chats.get(id);
			
			if(chat!=null) {
				updatedChat.setId(id);
				chats.put(id, updatedChat);
				return new ResponseEntity<>(updatedChat, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		@GetMapping(value="/{id}")
		public ResponseEntity<Chat> getUser(@PathVariable long id){
			Chat chat = chats.get(id);
			if(chat!=null) {
				return new ResponseEntity<>(chat, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@DeleteMapping(value="/{id}")
		public ResponseEntity<Chat> borraAnuncio(@PathVariable long id) {

			Chat chat = chats.remove(id);

			if (chat != null) {
				return new ResponseEntity<>(chat, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		
		
		
}