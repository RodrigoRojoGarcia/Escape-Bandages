package es.sidelab.EscapeBandages;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.sidelab.EscapeBandages.BoxesHandler;

public class BoxesHandler2 extends TextWebSocketHandler{
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
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

        if(distPB < distMB && distPB < 1000){
            if(BoxesHandler.getBoxes().containsKey(id)){
                if(BoxesHandler.getBoxes().get(id).getX() != x){
                    BoxesHandler.getBoxes().get(id).setX(x);
                }
                if(BoxesHandler.getBoxes().get(id).getY() != y){
                    BoxesHandler.getBoxes().get(id).setY(y);
                }
                if(BoxesHandler.getBoxes().get(id).getAngle() != angle){
                    BoxesHandler.getBoxes().get(id).setAngle(angle);
                }
            }
            else{
                BoxesHandler.getBoxes().put(id, new Box(x, y, angle));
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
