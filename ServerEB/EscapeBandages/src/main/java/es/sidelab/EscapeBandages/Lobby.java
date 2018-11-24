package es.sidelab.EscapeBandages;

import java.util.ArrayList;
import java.util.List;

public class Lobby {
	private User user1;
	private User user2;
	private boolean full;
	private static List<Chat> display = new ArrayList<>();
	
	public Lobby() {
		
	}
	public Lobby(User user) {
		this.user1 = user;
		this.full = false;
	}
	public Lobby(User user1, User user2) {
		this.user1 = user1;
		this.user2 = user2;
		this.full = true;
	}
	public User getUser1() {
		return user1;
	}
	public void setUser1(User user1) {
		this.user1 = user1;
	}
	public User getUser2() {
		return user2;
	}
	public void setUser2(User user2) {
		this.user2 = user2;
	}
	public List<Chat> getDisplay (){
		return display;
	}
	public void addChat(Chat chat) {
		display.add(chat);
	}
	public boolean isFull() {
		return full;
	}
	public void setFull(boolean full) {
		this.full = full;
	}
	
}
