package es.sidelab.EscapeBandages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;



public class MummyLifeHandler extends TextWebSocketHandler{
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private static Map<Integer, Personaje> personajes = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	public static Map<Integer, Personaje> getPersonajes(){
		return personajes;
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		
		JsonNode jnode = mapper.readTree(message.getPayload());
		//String uwu = jnode.get("UwU").asText();

		if(personajes.containsKey(1)){
			if(personajes.get(1).getLife() != jnode.get("life").asInt()){
				personajes.get(1).setLife(jnode.get("life").asInt());
				
			}
		}
		else{
			personajes.put(1, new Personaje(jnode.get("life").asInt()));
			
		}

		ObjectNode node = mapper.createObjectNode();
		node.put("life", personajes.get(1).getLife());
		boolean dead = false;

		if(personajes.get(1).getLife() <= 0){
			dead = true;
		}
		node.put("dead", dead);
		
		if(dead){
			for(WebSocketSession s : sessions.values()) {
				s.sendMessage(new TextMessage(node.toString()));
			}
		}else{
			for(WebSocketSession s : sessions.values()) {
				if(!s.getId().equals(session.getId()))
					s.sendMessage(new TextMessage(node.toString()));
				
			}
		}

		
		
	
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status)throws Exception{
		sessions.remove(session.getId());
	}
}