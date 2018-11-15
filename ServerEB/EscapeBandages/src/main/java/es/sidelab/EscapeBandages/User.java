package es.sidelab.EscapeBandages;

public class User {
	private long id;
	private String character;
	private boolean ready;
	
	public User(String character, boolean ready) {
		this.character = character;
		this.ready = ready;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCharacter() {
		return character;
	}
	public void setCharacter(String character) {
		this.character = character;
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