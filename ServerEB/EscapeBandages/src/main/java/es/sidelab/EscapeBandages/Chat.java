package es.sidelab.EscapeBandages;

import java.io.*;

public class Chat {
	private String character;
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
		this.sentence = sentence;
	}

	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
		this.user = user;
	}


	public String getSentence() {
		return sentence;
	}

	public void setSentence(String sentence) {
		this.sentence = sentence;
	}
	
	public void setCharacter(String character) {
		this.character = character;
	}
	
	public String getCharacter() {
		return this.character;
	}


	@Override
	public String toString() {
		return "["+user+"]" + " <" + getCharacter() + "> :" + sentence;
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
