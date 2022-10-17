package ab.instantmessenger.controller;

import ab.instantmessenger.model.Message;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class MessagingController {

    @Autowired
    ConversationService conversationService;

    @MessageMapping("/conversations/{conversationId}/messages")
    @SendTo("/topic/conversations/{conversationId}/messages")
    public Message sendMessage(@Payload Message message, @DestinationVariable long conversationId) {
        conversationService.addMessage(message, conversationId);
        return message;
    }

}
