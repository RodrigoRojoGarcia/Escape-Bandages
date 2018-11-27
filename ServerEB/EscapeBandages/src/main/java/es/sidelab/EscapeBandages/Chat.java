package es.sidelab.EscapeBandages;

import java.io.*;

public class Chat {
	private int option;
	private long id = -1;
	private String user;
	private String sentence;

	
	public Chat() {
	}
	public Chat(String sentence, String user) {
		super();
		this.user = user;
		this.sentence = sentence;
	}
	public Chat(String sentence, String user, int option) {
		super();
		this.user = user;
		this.option = option;
		this.sentence = sentence;
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
	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
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



	@Override
	public String toString() {
		return "id: "+id+", ["+user+"]" + " <" + getCharacter() + "> :" + sentence;
	}
	
	public void toFile()
	    {
	        FileWriter fichero = null;
	        PrintWriter pw = null;
	        try
	        {
	            fichero = new FileWriter("C:/Temp/Escape-Bandages/chats.txt", true);
	            pw = new PrintWriter(fichero);
	            pw.println(toString());
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
