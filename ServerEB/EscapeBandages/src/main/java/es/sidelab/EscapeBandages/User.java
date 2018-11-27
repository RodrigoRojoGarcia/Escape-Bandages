package es.sidelab.EscapeBandages;

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
		return "User [userName="+userName+", state="+state+", ready="+ready+"]";
	}
}
