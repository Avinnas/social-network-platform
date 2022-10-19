package ab.instantmessenger.controller;

import ab.instantmessenger.dto.MessageWriteDto;
import ab.instantmessenger.model.Message;
import ab.instantmessenger.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class MessagingController {

    @Autowired
    private ConversationService conversationService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/conversations/{conversationId}/messages")
    public void sendMessage(MessageWriteDto messageDto, @DestinationVariable long conversationId) {
        String destination = "/topic/conversations/"+ conversationId+"/messages";
        Message message = conversationService.addMessage(messageDto, conversationId);
        simpMessagingTemplate.convertAndSend(destination, message);
    }

}
