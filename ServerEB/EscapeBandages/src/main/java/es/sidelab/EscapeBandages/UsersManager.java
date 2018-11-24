package es.sidelab.EscapeBandages;

import java.util.Stack;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class UsersManager {

	private static ScheduledExecutorService controller = Executors.newSingleThreadScheduledExecutor();
	
	private static boolean serverIsOn = false;
	
	private static int maxTimeOfInactivity = 3;
	
	private static int timeUnit = 500;
	
	public static void init() {
		if(serverIsOn) {
			System.out.println("Ya estaba iniciado");
			return;
		}
		
		serverIsOn = true;
		
		
		controller.scheduleWithFixedDelay(()->{
			
			
			Stack<User> usersToDisconnect = new Stack<>();
			
			
			for(User user: UserController.users()) {
				//System.out.println("UwU");
				user.increaseTimeInactivity();
				if(user.getTimeInactivity() > maxTimeOfInactivity) {
					usersToDisconnect.push(user);
				}
			}
			
			while(!usersToDisconnect.empty()) {
				
				User aux = usersToDisconnect.pop();
				UsersController.disconnectUser(aux.getUserName());
			}
		}, timeUnit, timeUnit, TimeUnit.MILLISECONDS);
		
	}
}
