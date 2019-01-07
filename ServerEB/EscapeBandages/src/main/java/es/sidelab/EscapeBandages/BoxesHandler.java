package es.sidelab.EscapeBandages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class BoxesHandler extends TextWebSocketHandler{
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private static Map<Long, Box> boxes = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	public static Map<Long, Box> getBoxes(){
		return boxes;
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		
		JsonNode jnode = mapper.readTree(message.getPayload());
		//String uwu = jnode.get("UwU").asText();
		Long id = jnode.get("id").asLong();
		double x = jnode.get("X").asDouble();
		double y = jnode.get("Y").asDouble();
		double angle = jnode.get("Ang").asDouble();
		double posXM = jnode.get("xMummy").asDouble();
		double posYM = jnode.get("yMummy").asDouble();
		double posXP = jnode.get("xPharaoh").asDouble();
		double posYP = jnode.get("yPharaoh").asDouble();

		double distMB = Math.sqrt(Math.pow(posXM - x, 2) + Math.pow(posYM - y, 2));
		double distPB = Math.sqrt(Math.pow(posXP - x, 2) + Math.pow(posYP - y, 2));

		if(distMB <= distPB && distMB < 1000){
			if(boxes.containsKey(id)){
				if(boxes.get(id).getX() != x){
					boxes.get(id).setX(x);
				}
				if(boxes.get(id).getY() != y){
					boxes.get(id).setY(y);
				}
				if(boxes.get(id).getAngle() != angle){
					boxes.get(id).setAngle(angle);
				}
			}
			else{
				boxes.put(id, new Box(x, y, angle));
			}

			for(WebSocketSession s : sessions.values()) {
				if(!s.getId().equals(session.getId()))
					s.sendMessage(new TextMessage(jnode.toString()));
			}
		}

		

		
		//ObjectNode node = mapper.createObjectNode();
		//node.put("UwU", uwu);
		

		
		
		
		
		
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
