package es.sidelab.EscapeBandages;

import java.io.*;

public class Chat {
	private String character="";
	private String user;
	private int sentences;
	private String sentence1;
	private String sentence2;
	private String sentence3;

	
	public Chat() {
	}
	public Chat(String sentence, String user) {
		super();
		this.user = user;
		
		
		int numeroSentencias = sentence.length()/30;

		if(numeroSentencias >= 3) {
			this.sentences = 3;
			this.sentence1 = sentence.substring(0,29);
			this.sentence2 = sentence.substring(29,59);
			this.sentence3 = sentence.substring(59,89);
		}else if(numeroSentencias == 2) {
			this.sentences = 3;
			this.sentence1 = sentence.substring(0,29);
			this.sentence2 = sentence.substring(29,59);
			this.sentence3 = sentence.substring(59);
		}else if (numeroSentencias == 1){
			this.sentences = 2;
			this.sentence1 = sentence.substring(0,29);
			this.sentence2 = sentence.substring(29);
		}else if(numeroSentencias < 1) {
			this.sentences = 1;
			this.sentence1 = sentence;
		}
		
	}
	public Chat(String sentence, String user, String character) {
		super();
		this.user = user;
		if(sentence.length()>21) {
			int numeroSentencias = sentence.length()/21;
			if(numeroSentencias >= 3) {
				this.sentences = 3;
				this.sentence1 = sentence.substring(0,20);
				this.sentence2 = sentence.substring(21,41);
				this.sentence3 = sentence.substring(42,62);
			}else if(numeroSentencias == 2) {
				this.sentences = 2;
				this.sentence1 = sentence.substring(0,20);
				this.sentence2 = sentence.substring(20);
			}else if (numeroSentencias == 1){
				this.sentences = 1;
				this.sentence1 = sentence;
			}
		}
		this.character = character;
	}
	
	public String getCharacter() {
		return character;
	}
	public void setCharacter(String character) {
		this.character = character;
	}
	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
		this.user = user;
	}


	public String getSentence1() {
		return this.sentence1;
	}

	public void setSentence1(String sentence) {
		this.sentence1 = sentence;
	}
	public String getSentence2() {
		return this.sentence2;
	}

	public void setSentence2(String sentence) {
		this.sentence2 = sentence;
	}
	public String getSentence3() {
		return this.sentence3;
	}

	public void setSentence3(String sentence) {
		this.sentence3 = sentence;
	}
	public int getSentences() {
		return this.sentences;
	}
	public void setSentences(int n) {
		this.sentences = n;
	}


	@Override
	public String toString() {
		return "["+user+"]" + " <" + this.character + "> :" + sentence1;
	}
	
	public void toFile()
	    {
	        FileWriter fichero = null;
	        PrintWriter pw = null;
	        try
	        {
	            fichero = new FileWriter("/classes/users.txt", true);
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
