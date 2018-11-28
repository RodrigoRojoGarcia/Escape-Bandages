package es.sidelab.EscapeBandages;

import java.io.FileWriter;
import java.io.PrintWriter;

public class User {
	private String userName;
	private String state;
	private int timeInactive=0;
	private boolean ready;
	
	
	public User() {
		
	}
	public User(String userName) {
		super();
		this.userName = userName;
	}
	public User(String userName, String state, boolean ready) {
		super();
		this.userName = userName;
		this.state = state;
		this.ready = ready;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getTimeInactivity() {
		return timeInactive;
	}
	public void setTimeInactivity(int time) {
		this.timeInactive = time;
	}
	public void increaseTimeInactivity() {
		this.timeInactive += 1;
	}
	public boolean getReady() {
		return ready;
	}
	public void setReady(boolean ready) {
		this.ready = ready;
	}
	
	@Override
	public String toString() {
		return userName;
	}
	
	public void toFile(String password)
    {
        FileWriter fichero = null;
        PrintWriter pw = null;
        try
        {
            fichero = new FileWriter("users.txt", true);
            pw = new PrintWriter(fichero);
            pw.println(toString()+ " " + password); //introduce en fichero una linea con el username y el fichero
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        	try {
        		// Nuevamente aprovechamos el finally para 
        		// asegurarnos que se cierra el fichero.
        		if (null != fichero)
        			fichero.close();
        	} catch (Exception e2) {
        		e2.printStackTrace();
        	}
        }
    }
}
