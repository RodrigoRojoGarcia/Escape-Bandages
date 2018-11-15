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



@RestController
public class UserController {
	
	private Map<Long, User> users = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	
		@GetMapping("/users/")
		public Collection<User> users() {
			return users.values();
		}
		
		@PostMapping("/users/")
		@ResponseStatus(HttpStatus.CREATED)
		public User newUser(@RequestBody User user) {
			long id = lastId.incrementAndGet();
			user.setId(id);
			users.put(id, user);
			
			return user;
		}
		
		
		@PutMapping("/users/{id}")
		public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User updatedUser){
		
			User user = users.get(id);
			
			if(user!=null) {
				updatedUser.setId(id);
				users.put(id, updatedUser);
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		@GetMapping("/users/{id}")
		public ResponseEntity<User> getUser(@PathVariable long id){
			User user = users.get(id);
			if(user!=null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@DeleteMapping("/users/{id}")
		public ResponseEntity<User> borraAnuncio(@PathVariable long id) {

			User user = users.remove(id);

			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		
		
		
}
