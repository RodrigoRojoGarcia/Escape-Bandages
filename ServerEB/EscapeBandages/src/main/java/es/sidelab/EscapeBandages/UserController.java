package es.sidelab.EscapeBandages;

import java.util.Collection;
import java.util.Map;
import java.util.ArrayList;
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
@RequestMapping("/users")
public class UserController {
	
	
	private ArrayList<String> userNames = new ArrayList<String>();
	private static Map<Long, User> users = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	
		@GetMapping(value="/")
		public static Collection<User> users() {
			return users.values();
		}
		
		@PostMapping(value="/")
		@ResponseStatus(HttpStatus.CREATED)
		public User newUser(@RequestBody User user) {
			long id = lastId.incrementAndGet();
			user.setId(id);
			users.put(id, user);
			
			return user;
		}
		
		
		@PutMapping(value="/{id}")
		public ResponseEntity<User> updateUserName(@PathVariable long id, @RequestBody User updatedUser){
		
			User user = users.get(id);
			
			if(user!=null) {
				
				updatedUser.setId(id);
				
				if(userNames.isEmpty()) {
					users.put(id, updatedUser);
					userNames.add(updatedUser.getUserName());
				}else {
					boolean found = false;
					for(String userName : userNames) {
						found = found || updatedUser.getUserName().equals(userName);
					}
					if(!found) {
						users.put(id, updatedUser);
						userNames.add(updatedUser.getUserName());
					}else {
						updatedUser.setId(-1);;
					}
				}
				
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@PutMapping(value="/character/{id}")
		public ResponseEntity<User> updateUserCharacter(@PathVariable long id, @RequestBody User updatedUser){
		
			User user = users.get(id);
			System.out.println("UwU");
			if(user!=null) {
				
				updatedUser.setId(id);
				updatedUser.setUserName(user.getUserName());
				users.put(id, updatedUser);
					
	
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@GetMapping(value="/{id}")
		public ResponseEntity<User> getUser(@PathVariable long id){
			User user = users.get(id);
			if(user!=null) {
				user.setTimeInactivity(0);
				return new ResponseEntity<>(user, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@DeleteMapping(value="/{userName}")
		public ResponseEntity<User> deleteUserName(@PathVariable String userName){
			User user = new User(userName);
			if(userName!=null) {
				userNames.remove(userName);
				
				return new ResponseEntity<>(user, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		
		
		public static void deleteUser(long id) {

			users.remove(id);

		}
		
		
		
		
		
		
		
}
