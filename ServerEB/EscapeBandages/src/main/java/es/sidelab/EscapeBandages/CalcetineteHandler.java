package es.sidelab.EscapeBandages;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class CalcetineteHandler extends TextWebSocketHandler{
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		
		JsonNode jnode = mapper.readTree(message.getPayload());
		String uwu = jnode.get("UwU").asText();
		
		
		ObjectNode node = mapper.createObjectNode();
		node.put("UwU", uwu);
		
		session.sendMessage(new TextMessage(node.toString()));
		
	}
}
