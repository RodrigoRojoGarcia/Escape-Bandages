package es.sidelab.EscapeBandages;

import java.util.Stack;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class UsersManager {

	private static ScheduledExecutorService controller = Executors.newSingleThreadScheduledExecutor();
	
	private static boolean serverIsOn = false;
	
	private static int maxTimeOfInactivity = 8;
	
	private static int timeUnit = 500;
	
	public static void init() {
		if(serverIsOn) {
			System.out.println("Ya estaba iniciado");
			return;
		}
		
		serverIsOn = true;
		
		
		controller.scheduleWithFixedDelay(()->{
			
			
			Stack<Client> clientsToDisconnect = new Stack<>();
			
			
			for(Client client: ClientController.clients()) {
				//System.out.println("UwU");
				client.increaseInactivty();
				if(client.getTimeOfInactivity() > maxTimeOfInactivity) {
					clientsToDisconnect.push(client);
				}
			}
			
			while(!clientsToDisconnect.empty()) {
				
				Client aux = clientsToDisconnect.pop();
				ClientController.disconnectClient(aux.getId());
			}
		}, timeUnit, timeUnit, TimeUnit.MILLISECONDS);
		
	}
}
