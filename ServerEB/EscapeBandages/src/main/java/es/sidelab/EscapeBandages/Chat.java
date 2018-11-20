package es.sidelab.EscapeBandages;

public class Chat {
	private User user;
	private int option = 0;
	private long id = -1;
	private String sentence;
	private boolean sent;
	
	public Chat() {
		this.user = new User();
	}
	
	public Chat(String sentence, boolean sent, User user, int option) {
		super();
		this.user = user;
		this.option = option;
		this.sentence = sentence;
		this.sent = sent;
	}
	public void setOption(int option) {
		this.option = option;
	}
	
	public String getCharacter() {
		if(option == 0) {
			return "Mummy";
		}else {
			return "Pharaoh";
		}
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSentence() {
		return sentence;
	}

	public void setSentence(String sentence) {
		this.sentence = sentence;
	}

	public boolean isSent() {
		return sent;
	}

	public void setSent(boolean sent) {
		this.sent = sent;
	}

	@Override
	public String toString() {
		return "["+user+"]" + " <" + getCharacter() + "> :" + sentence;
	}
	
	
}
