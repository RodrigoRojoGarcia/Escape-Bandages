package es.sidelab.EscapeBandages;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
public class ClientController {
	
	
	//Guarda todos los clientes conectados al servidor identificados por ids únicas calculadas en el juego
		private static Map<Long, Client> clients = new ConcurrentHashMap<>();
		
		private static Map<Long, Integer> numberWindows = new ConcurrentHashMap<>();
	
	public static Map<Long,Client> getClients(){
		return clients;
	}
	
	
	//Devuelve todos los clientes conectados al servidor
		@GetMapping(value="/")
		public static Collection<Client> clients(){
			return clients.values();
		}
		
		@GetMapping(value="/user/{id}")
		public ResponseEntity<User> getUser(@PathVariable long id){
			if(clients.get(id)!=null) {
				return new ResponseEntity<>(clients.get(id).getUser(),HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			 
		}
		
		//Get para que no se desconecte el cliente. Resetea el tiempo de inactividad del mismo
		@GetMapping(value="/{id}")
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
		@PostMapping(value="/{id}")
		public ResponseEntity<Client> addClient(@PathVariable long id){
			if(!numberWindows.containsKey(id)) {
				numberWindows.put(id, 1);
				if(!clients.containsKey(id*10+1)) {
				Client client = new Client(id*10+1);
				clients.put(id*10+1, client);
				return new ResponseEntity<>(client, HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}else {
				int windowN = numberWindows.get(id)+1;
				numberWindows.put(id, windowN);
				if(!clients.containsKey(id*10+windowN)) {
					Client client = new Client(id*10+windowN);
					clients.put(id*10+windowN, client);
					return new ResponseEntity<>(client, HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}
			
			
						
		}
		//Eliminamos un cliente cuando se desconecta
		@DeleteMapping(value="/{id}")
		public static void disconnectClient(@PathVariable long id) {
			if(clients.get(id).getUser()!=null)
			UsersController.disconnectUser(clients.get(id).getUser().getUserName());
			clients.remove(id);
		}
}
