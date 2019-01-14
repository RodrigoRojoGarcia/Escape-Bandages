package es.sidelab.EscapeBandages;


import java.util.Collection;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UsersController {
	
	//Guarda los usuarios relacionados con su contraseña, así no se puede repetir los usuarios
	private static Map<String,String> userspasswords = new ConcurrentHashMap<>();
	//Guarda todos los usuarios, también identificados por su nombre. Existe para que el get de los usuario
	private static Map<String,User> users = new ConcurrentHashMap<>();
	
	public static Map<String,User> getUsers(){
		return users;
	}
	
	
	
	//Introduce los datos de los usuarios creados en el hashmap
		public static void introduceData(LinkedList<String> datos) {
			String cad[] = new String[2];
			for(int i = 0; i < datos.size(); i++) {
				cad = datos.get(i).split(" ");
				userspasswords.put(cad[0], cad[1]);
				
				User user1 = new User(cad[0],false,false);
				users.put(cad[0], user1);
			}
		}
	
	
	
	//Devuelve todos los usuarios registrados
	@GetMapping(value="/")
	public static Collection<User> users(){
		return users.values();
	}
	/*
	 * Log in de usuarios.
	 * Si el usuario no existe se crea el usuario.
	 * Si la contraseña no es correcta se devuelve un error no válido.
	 * 
	*/
	
	
	
	@PostMapping(value="/register/{id}/{userName}/{password}")
	public int registerUser(@PathVariable String id,@PathVariable String userName, @PathVariable String password) {
		if(ClientController.getClients().get(id)!=null) {
			if(ClientController.getClients().get(id).getUser()==null) {
				if(!users.containsKey(userName)) {
					User newUser = new User(userName,false,false);
					newUser.toFile(password);
					users.put(userName, newUser);
					userspasswords.put(userName, password);
					//Usuario registrado
					return 0;
				}else {
					//Usuario está registrado
					return -3;
				}
			}else {
				//Ya existe un usuario en este cliente
				return -2;
			}
		}else {
			//Cliente no válido
			return -1;
		}
	}	
	
	@PostMapping(value="/{id}/{userName}/{password}")
	public int newUser(@PathVariable String id,@PathVariable String userName, @PathVariable String password) {
		//Si el cliente correspondiente a la id pasada por la url no existe
		if(ClientController.getClients().get(id)!=null) {
			if(ClientController.getClients().get(id).getUser()==null) {
					if(users.containsKey(userName)) {
						if(!users.get(userName).isOnline()) {
							if(userspasswords.containsKey(userName)) {
								if(userspasswords.get(userName).equals(password)) {
									users.get(userName).setOnline(true);
									ClientController.getClients().get(id).setUser(users.get(userName));
									//Registrado con éxito
									return 1;
								}else {
									//Contraseña errónea
									return -5;
								}
							}else {
								//Usuario  no registrado con contraseña
								return -4;
							}
						}else if(users.get(userName).isOnline()) {
							//Usuario ya conectado
							return -3;
						}else {
							//Estado del usuario no válido
							return -2;
						}
				}else {
					//Usuario no está registrado
					return 0;
				}
			}else {
				//Cliente ya tiene un usuario asginado
				return -6;
			}
			
		}else {
			//Cliente no válido
			return -1;
		}
	}
	
	
	
	
	
	//Desconectar a un usuario
		@DeleteMapping(value="/{userName}")
		public static void disconnectUser(@PathVariable String userName) {
			//Si existe
			
			if(users.get(userName)!=null) {
				//Cambiar su estado a OFFLINE
				users.get(userName).setOnline(false);
				
				LobbyController.showDisconnected(userName);
				//Por todos los Lobbies
				for(long id : LobbyController.getLobbies().keySet()) {
					//Si existe el usuario 1
					if(LobbyController.getLobbies().get(id).getUser1() != null) {
						//Si el usuario 1 es el usuario que se desconecta
						if(LobbyController.getLobbies().get(id).getUser1().getUserName().equals(userName)) {
							//Eliminarlo
							LobbyController.getLobbies().get(id).setUser1(null);
							//Decir que no está lleno el lobby
							LobbyController.getLobbies().get(id).setFull(false);
						}	
						
					}
					//Si existe el usuario 2
					if(LobbyController.getLobbies().get(id).getUser2() != null) {
						//Si el usuario 2 es el que se desconecta
						if(LobbyController.getLobbies().get(id).getUser2().getUserName().equals(userName)) {
							//Quitarlo
							LobbyController.getLobbies().get(id).setUser2(null);
							//El lobby ya no está lleno
							LobbyController.getLobbies().get(id).setFull(false);
						}
					}
					//Si está vacío el lobby
					if(LobbyController.getLobbies().get(id).getUser1()==null && LobbyController.getLobbies().get(id).getUser2()==null) {
						//Eliminamos es el lobby
						LobbyController.removeLobby(id);
					}
				}
				
				
				//Por todos los clientes
				for(String id : ClientController.getClients().keySet()) {
					//Si el cliente tiene asociado un usuario
					if(ClientController.getClients().get(id).getUser() != null) {
						//Es el usuario que se desconecta
						if(ClientController.getClients().get(id).getUser().getUserName().equals(userName)) {
							//Eliminamos la asociación del usuario
							ClientController.getClients().get(id).setUser(null);
						}
					}
					
				}
				
				
				
			}
	}
		
		
		
	
}
