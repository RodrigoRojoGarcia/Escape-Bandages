package es.sidelab.EscapeBandages;

public class User {
	private long id=-1;
	private String userName;
	private String character;
	private int timeInactive;
	private boolean ready;
	
	
	public User() {
		
	}
	public User(String userName) {
		super();
		this.userName = userName;
	}
	public User(String userName, String character, boolean ready) {
		super();
		this.userName = userName;
		this.character = character;
		this.ready = ready;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCharacter() {
		return character;
	}
	public void setCharacter(String character) {
		this.character = character;
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
		return "User [id="+id+", character="+character+", ready="+ready+"]";
	}
}
